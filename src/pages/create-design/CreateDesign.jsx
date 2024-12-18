import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // For handling image uploads
import { createDesign } from "@/utils/api/designs";
import { useNavigate } from "react-router-dom";

export default function CreateDesign() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Track the selected image
  const [loading, setLoading] = useState(false);

  const handleCreateDesign = async () => {
    setLoading(true);
    if (!title || !description || !image) {
      setLoading(false);
      return;
    }


    // Create a FormData object to send the data as multipart/form-data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image); // Append the image file

    await createDesign(formData);

    setLoading(false);
    navigate('/my-designs')
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImage(file); // Set the file in the state
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-gray-800">
              Create New Design
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Design Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your design title"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your design"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="imageUpload">Upload Design Image</Label>
                <Input
                  type="file"
                  id="imageUpload"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              <Button
                onClick={handleCreateDesign}
                className="w-full"
                disabled={loading}
              >
                {loading ? "creating..." : "Create Design"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
