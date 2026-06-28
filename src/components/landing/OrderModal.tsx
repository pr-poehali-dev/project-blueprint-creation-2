import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Icon from '@/components/ui/icon'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('https://functions.poehali.dev/470e4b96-7852-4048-9a4f-b6091b9bf704', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setSuccess(true)
        setName('')
        setPhone('')
      } else {
        setError(data.error || 'Ошибка отправки. Попробуйте ещё раз.')
      }
    } catch {
      setError('Ошибка соединения. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setSuccess(false)
    setError('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            className="relative bg-neutral-900 border border-neutral-700 rounded-2xl p-8 w-full max-w-md"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white">
              <Icon name="X" size={20} />
            </button>

            {success ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                <p className="text-neutral-400">Мы свяжемся с вами в ближайшее время.</p>
                <Button
                  onClick={handleClose}
                  className="mt-6 bg-[#FF4D00] hover:bg-[#e04400] text-white border-0"
                >
                  Закрыть
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-2">Оформить заказ</h3>
                <p className="text-neutral-400 mb-6">Оставьте контакты — мы свяжемся с вами</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Ваше имя"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-500"
                    required
                  />
                  <Input
                    placeholder="Телефон"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-500"
                    required
                  />
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FF4D00] hover:bg-[#e04400] text-white border-0 mt-2"
                  >
                    {loading ? 'Отправляем...' : 'Отправить заявку'}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
