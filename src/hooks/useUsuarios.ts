import { useEffect, useState } from 'react'

interface Usuario {
  id: number
  [key: string]: any
}

interface UseUsuariosResult {
  usuarios: Usuario[]
  loading: boolean
  error: string | null
}

export const useUsuarios = (): UseUsuariosResult => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/usuarios')
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }
        const data = await response.json()
        setUsuarios(data.usuarios ?? [])
      } catch (err: any) {
        setError(err.message ?? String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchUsuarios()
  }, [])

  return { usuarios, loading, error }
}

