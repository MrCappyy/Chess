import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-4xl font-bold text-center mb-8">Chess Game</h1>
        
        <div className="grid gap-4">
          <Button 
            className="h-16 text-lg"
            onClick={() => navigate("/play/ai")}
          >
            Play vs Computer
          </Button>
          
          <Button 
            className="h-16 text-lg"
            onClick={() => navigate("/play/local")}
          >
            Play vs Friend (Local)
          </Button>
          
          <Button 
            className="h-16 text-lg"
            variant="outline"
            onClick={() => navigate("/learn")}
          >
            Learn Chess
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MainMenu;