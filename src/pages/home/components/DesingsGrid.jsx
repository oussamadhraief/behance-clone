import { Card, CardContent } from "@/components/ui/card";
import { getAllDesigns } from "@/utils/api/designs";
import { Heart, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function DesignsGrid() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDesigns();
        console.log(response);

        setDesigns(response);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <Link key={design.id} to={`/designs/${design.id}`}>
            <Card key={design.id} className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={`http://localhost:9696${design.imageUrl}`}
                  alt={design.title}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">{design.title}</h3>
                  <p className="font-medium mb-5 text-gray-600 text-sm">
                    {design.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={`http://localhost:9696${design.appUser.profilePicture}`}
                        alt={design.appUser.username}
                        className="h-8 w-8 rounded-full"
                      />
                      <p className="text-sm text-muted-foreground">
                        {design.appUser.username}
                      </p>
                    </div>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" /> {design.likesCount}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
