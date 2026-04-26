// File: apps/mini-app/app/(game)/wall/page.tsx

'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '@/providers/ThemeProvider'
import { CheckCircle, Star, Share2, Download, Radio, FileText } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  reward: number
  type: 'share' | 'download' | 'join' | 'watch'
  icon: React.ReactNode
  completed: boolean
}

export default function WallPage() {
  const { colors } = useTheme()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Share with Friends',
      description: 'Share Blender in Telegram',
      reward: 100,
      type: 'share',
      icon: <Share2 size={20} />,
      completed: false,
    },
    {
      id: '2',
      title: 'Join Community',
      description: 'Join our Telegram channel',
      reward: 50,
      type: 'join',
      icon: <Radio size={20} />,
      completed: false,
    },
    {
      id: '3',
      title: 'Watch Tutorial',
      description: 'Watch the 3-minute tutorial',
      reward: 75,
      type: 'watch',
      icon: <Download size={20} />,
      completed: true,
    },
    {
      id: '4',
      title: 'Read Whitepaper',
      description: 'Read the full documentation',
      reward: 50,
      type: 'watch',
      icon: <FileText size={20} />,
      completed: false,
    },
  ])

  const totalRewards = tasks.reduce((sum, t) => sum + (t.completed ? t.reward : 0), 0)

  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: true } : t)))
  }

  return (
    <main className="min-h-screen pt-20 pb-24 px-4" style={{ backgroundColor: colors.bg.primary }}>
      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold mb-1" style={{ color: colors.text.primary }}>
          The Wall 📢
        </h1>
        <p style={{ color: colors.text.secondary }}>Complete tasks, earn Stars</p>
      </motion.div>

      {/* Rewards Banner */}
      <motion.div
        className="mb-8 rounded-2xl border p-6 flex items-center justify-between"
        style={{
          backgroundColor: colors.bg.secondary,
          borderColor: colors.accent.primary,
          background: `linear-gradient(135deg, ${colors.accent.glow} 0%, ${colors.bg.secondary} 100%)`,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p style={{ color: colors.text.muted }} className="text-sm">
            Earned Today
          </p>
          <motion.p
            className="text-3xl font-bold mt-1"
            style={{ color: colors.accent.primary }}
            key={totalRewards}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {totalRewards}
          </motion.p>
        </div>
        <motion.div
          className="text-5xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ⭐
        </motion.div>
      </motion.div>

      {/* Tasks List */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05 }}
      >
        {tasks.map((task, idx) => (
          <TaskCard
            key={task.id}
            task={task}
            index={idx}
            colors={colors}
            onComplete={() => handleCompleteTask(task.id)}
          />
        ))}
      </motion.div>

      {/* Promo Section */}
      <motion.div
        className="mt-8 rounded-2xl border p-6 text-center"
        style={{
          backgroundColor: colors.bg.secondary,
          borderColor: colors.border.default,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p style={{ color: colors.text.muted }} className="text-sm mb-3">
          Want to reach thousands of players?
        </p>
        <motion.button
          className="px-6 py-2 rounded-lg font-bold text-white"
          style={{ backgroundColor: colors.accent.primary }}
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
  colors,
  onComplete,
}: {
  task: any
  index: number
  colors: any
  onComplete: () => void
}) {
  return (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-lg border transition-all"
      style={{
        backgroundColor: task.completed ? `${colors.status.success}10` : colors.bg.secondary,
        borderColor: task.completed ? colors.status.success : colors.border.default,
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Icon */}
      <motion.div
        style={{
          color: task.completed ? colors.status.success : colors.accent.primary,
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {task.icon}
      </motion.div>

      {/* Content */}
      <div className="flex-1">
        <h3
          className="font-semibold"
          style={{
            color: task.completed ? colors.status.success : colors.text.primary,
          }}
        >
          {task.title}
        </h3>
        <p style={{ color: colors.text.secondary }} className="text-sm">
          {task.description}
        </p>
      </div>

      {/* Reward & Button */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-bold" style={{ color: colors.accent.primary }}>
            {task.reward}
          </p>
          <p style={{ color: colors.text.muted }} className="text-xs">
            Stars
          </p>
        </div>

        <motion.button
          onClick={onComplete}
          disabled={task.completed}
          className="px-4 py-2 rounded-lg font-semibold transition-all"
          style={{
            backgroundColor: task.completed
              ? `${colors.status.success}30`
              : colors.accent.primary,
            color: task.completed ? colors.status.success : 'white',
            cursor: task.completed ? 'default' : 'pointer',
          }}
          whileHover={!task.completed ? { scale: 1.05 } : {}}
          whileTap={!task.completed ? { scale: 0.95 } : {}}
        >
          {task.completed ? <CheckCircle size={16} /> : 'Go'}
        </motion.button>
      </div>
    </motion.div>
  )
}