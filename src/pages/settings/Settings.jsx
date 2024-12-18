import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/store/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getCurrentUser, updateUser } from '@/utils/api/auth' // Added updateUser

export default function Settings() {
  const { user, setUser } = useAuth() // Accessing user and setUser from AuthContext
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null) // State for file upload

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCurrentUser()
        reset({ // Populate form with fetched user data
          name: response?.name || '',
          bio: response?.bio || '',
          password: '',
        })
      } catch (error) {
        console.error('Failed to fetch user data:', error)
        setError('Failed to load user data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [reset])

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('bio', data.bio)
      if (data.password) formData.append('password', data.password)
      if (file) formData.append('newProfilePicture', file)

      await updateUser(formData) // Update user on the backend

      // Refresh user data after successful update
      const updatedUser = await getCurrentUser()
      setUser(updatedUser) // Update the user context with the new data

      setMessage('Settings updated successfully')
      setError('')
    } catch (err) {
      console.error('Error updating settings:', err)
      setError('Failed to update settings')
      setMessage('')
    }
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className="mb-4">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register('name', { required: 'Name is required' })}
                placeholder="Your name"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                {...register('bio')}
                placeholder="Your bio"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="Leave blank to keep current password"
              />
            </div>
            <div className="space-y-2">
              <Label>Profile Picture</Label>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={`http://localhost:9696${user?.profilePicture}`} alt="Profile Picture" />
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <Input
                  id="newProfilePicture"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">Update Settings</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
