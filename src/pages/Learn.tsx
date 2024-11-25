import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const chessLessons = [
  {
    title: "Basic Rules",
    content: `Chess is played on a board of 64 squares arranged in an 8×8 grid. Each player starts with 16 pieces:
    1 king (♔/♚), 1 queen (♕/♛), 2 rooks (♖/♜), 2 knights (♘/♞), 2 bishops (♗/♝), and 8 pawns (♙/♟).
    The objective is to checkmate your opponent's king.`,
  },
  {
    title: "How Pieces Move",
    content: `King: Moves one square in any direction
Queen: Moves any number of squares diagonally, horizontally, or vertically
Rook: Moves any number of squares horizontally or vertically
Bishop: Moves any number of squares diagonally
Knight: Moves in an L-shape (two squares in one direction, then one square perpendicular)
Pawn: Moves forward one square at a time, can move two squares on first move`,
  },
  {
    title: "Special Moves",
    content: `Castling: A special king move involving the rook
En Passant: A special pawn capture
Pawn Promotion: When a pawn reaches the opposite end of the board`,
  },
  {
    title: "Basic Tactics",
    content: `Pin: A piece cannot move because it would expose a more valuable piece to capture
Fork: One piece attacks two or more enemy pieces simultaneously
Skewer: Similar to a pin, but the more valuable piece is in front`,
  },
  {
    title: "Basic Strategy",
    content: `Control the center
Develop your pieces early
Castle your king to safety
Connect your rooks
Create pawn structure`,
  },
];

const Learn = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const nextPage = () => {
    if (currentPage < chessLessons.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/")}
      >
        ← Back to Menu
      </Button>
      
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              {chessLessons[currentPage].title}
            </h1>
            <div className="text-sm text-gray-500">
              Page {currentPage + 1} of {chessLessons.length}
            </div>
          </div>
          
          <ScrollArea className="h-[400px] rounded-md border p-4">
            <div className="whitespace-pre-line">
              {chessLessons[currentPage].content}
            </div>
          </ScrollArea>

          <div className="flex justify-between mt-6">
            <Button
              onClick={previousPage}
              disabled={currentPage === 0}
              variant="outline"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={nextPage}
              disabled={currentPage === chessLessons.length - 1}
              variant="outline"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Learn;