import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useState } from "react";

interface SettingsButtonProps {
  onMoveAssistToggle: (enabled: boolean) => void;
}

const SettingsButton = ({ onMoveAssistToggle }: SettingsButtonProps) => {
  const [moveAssist, setMoveAssist] = useState(false);

  const handleMoveAssistToggle = (checked: boolean) => {
    setMoveAssist(checked);
    onMoveAssistToggle(checked);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Configure your chess game settings
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="move-assist">Move Assist</Label>
            <Switch
              id="move-assist"
              checked={moveAssist}
              onCheckedChange={handleMoveAssistToggle}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsButton;