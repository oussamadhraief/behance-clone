import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { getDesignById } from '@/utils/api/designs'
import { likeDesign } from '@/utils/api/like'
import { addComment } from '@/utils/api/comment'  // Assume this is your addComment API function

export function DesignDetail() {
  const { id } = useParams()
  const [design, setDesign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [commentContent, setCommentContent] = useState('')

  useEffect(() => {
    const fetchDesign = async () => {
      const data = await getDesignById(id)
      console.log(data);
      
      setDesign(data)
      setLoading(false)
    }
    fetchDesign()
  }, [id])

  const handleLike = async () => {
    // Send the like request to the backend
    await likeDesign(id)
    
    // After liking the design, update the liked state
    setDesign(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1,
    }))
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    // Add comment via API (assumes addComment API function exists)
    await addComment(id, commentContent)

    // Refresh the design data to show the new comment
    const updatedDesign = await getDesignById(id)
    setDesign(updatedDesign)

    // Reset comment input
    setCommentContent('')
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!design) {
    return <div className="container mx-auto px-4 py-8">Design not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{design.design.title}</h1>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={design.design.appUser.profilePicture} alt={design.design.appUser.username} />
              <AvatarFallback>{design?.design?.appUser?.username?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{design.design.appUser.username}</p>
              <p className="text-sm text-muted-foreground">Follow</p>
            </div>
          </div>
          <Button>Hire Me</Button>
        </div>
        <div className="mb-8">
          <img src={`http://localhost:9696${design.design.imageUrl}`} alt={design.design.title} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <Button variant="ghost" className="flex items-center space-x-2" onClick={handleLike}>
              <Heart className={`w-5 h-5 ${design.isLiked ? 'text-red-500' : 'text-black'}`} />
              <span>{design.likesCount}</span>
            </Button>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MessageCircle className="w-5 h-5" />
              <span>{design.comments.length}</span>
            </div>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </Button>
        </div>
        <div className="prose max-w-none mb-8">
          <p>{design.design.description}</p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {design.design.tags?.map((tag) => (
              <span key={tag} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Created on {new Date(design.design.createdAt).toLocaleDateString()}
        </div>

        {/* Add Comment Form */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>
          <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4 mb-8">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write a comment..."
              className="p-2 border rounded-lg"
              rows="4"
            />
            <Button type="submit" disabled={!commentContent.trim()}>
              Post Comment
            </Button>
          </form>
        </div>

        {/* Display Comments */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          {design.comments.length > 0 ? (
            design.comments.map((comment) => (
              <div key={comment.id} className="mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={comment?.user?.profilePicture} alt={comment?.user?.username} />
                    <AvatarFallback>{comment?.user?.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{comment?.user?.username}</p>
                    <p className="text-sm text-muted-foreground">{comment?.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
