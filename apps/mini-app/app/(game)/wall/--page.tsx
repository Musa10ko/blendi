// File: apps/mini-app/app/(game)/wall/page.tsx

'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface Task {
  id: string
  title: string
  description: string
  reward: number
  type: 'follow' | 'share' | 'join' | 'watch'
  icon: string
  completed: boolean
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Follow Telegram Channel',
    description: 'Join our official announcements channel',
    reward: 50,
    type: 'follow',
    icon: '📢',
    completed: false,
  },
  {
    id: '2',
    title: 'Share with Friends',
    description: 'Share Blender with 3 friends',
    reward: 100,
    type: 'share',
    icon: '👥',
    completed: false,
  },
  {
    id: '3',
    title: 'Join Discord',
    description: 'Join our Discord community',
    reward: 75,
    type: 'join',
    icon: '🎮',
    completed: true,
  },
  {
    id: '4',
    title: 'Watch Tutorial',
    description: 'Watch our 2-minute tutorial video',
    reward: 25,
    type: 'watch',
    icon: '📹',
    completed: false,
  },
]

export default function WallPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const totalRewards = tasks.reduce((sum, t) => sum + (t.completed ? t.reward : 0), 0)

  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: true } : t)))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-primary to-bg-secondary py-6 px-4">
      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-text-primary mb-2">The Wall</h1>
        <p className="text-text-secondary">Complete tasks, earn Stars</p>
      </motion.div>

      {/* Rewards Summary */}
      <motion.div
        className="mb-8 bg-gradient-to-r from-accent-primary/20 to-transparent border border-accent-primary/30 rounded-xl p-4 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="text-sm text-text-secondary">Earned Today</p>
          <motion.p
            className="text-3xl font-bold text-accent-primary"
            key={totalRewards}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {totalRewards}
          </motion.p>
        </div>
        <span className="text-4xl">⭐</span>
      </motion.div>

      {/* Task Categories */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {['all', 'follow', 'share', 'join', 'watch'].map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-full bg-bg-secondary border border-border-default text-sm font-semibold text-text-secondary hover:text-text-primary whitespace-nowrap"
          >
            {category === 'all' ? 'All Tasks' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05 }}
      >
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            onComplete={() => handleCompleteTask(task.id)}
          />
        ))}
      </motion.div>

      {/* Promotional Section */}
      <motion.div
        className="mt-8 bg-bg-secondary border border-border-default rounded-xl p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-sm text-text-secondary mb-3">Want to reach thousands of players?</p>
        <motion.button
          className="px-6 py-2 bg-accent-primary hover:bg-accent-hover text-white font-semibold rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create a Task
        </motion.button>
      </motion.div>
    </main>
  )
}

function TaskCard({
  task,
  index,
  onComplete,
}: {
  task: Task
  index: number
  onComplete: () => void
}) {
  return (
    <motion.div
      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
        task.completed
          ? 'bg-status-success/10 border-status-success/30'
          : 'bg-bg-secondary border-border-default hover:border-accent-primary/30'
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Icon */}
      <div className="text-2xl">{task.icon}</div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-semibold text-text-primary">{task.title}</h3>
        <p className="text-sm text-text-secondary">{task.description}</p>
      </div>

      {/* Reward & Action */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-bold text-accent-primary">{task.reward}</p>
          <p className="text-xs text-text-muted">Stars</p>
        </div>

        <motion.button
          onClick={onComplete}
          disabled={task.completed}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            task.completed
              ? 'bg-status-success/30 text-status-success cursor-default'
              : 'bg-accent-primary hover:bg-accent-hover text-white'
          }`}
          whileHover={!task.completed ? { scale: 1.05 } : {}}
          whileTap={!task.completed ? { scale: 0.95 } : {}}
        >
          {task.completed ? '✓' : 'Go'}
        </motion.button>
      </div>
    </motion.div>
  )
}