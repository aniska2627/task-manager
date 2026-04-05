package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Task struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
	Priority    string `json:"priority"`
	AssignedTo  string `json:"assignedTo"`
}

var tasks []Task

func main() {
	r := gin.Default()

	// ✅ CORS Fix (Important)
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "*")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	r.POST("/tasks", createTask)
	r.GET("/tasks", getTasks)

	r.Run(":8080")
}

func createTask(c *gin.Context) {
	var task Task

	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	tasks = append(tasks, task)

	c.JSON(http.StatusOK, gin.H{
		"message": "Task created",
		"task":    task,
	})
}

func getTasks(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"tasks": tasks,
	})
}
