import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

interface MoveHistoryProps {
  moves: string[];
}

const MoveHistory = ({ moves }: MoveHistoryProps) => {
  // Format moves into pairs of white and black moves
  const formattedMoves = moves.reduce((acc: { number: number; white: string; black: string; }[], move, index) => {
    if (index % 2 === 0) {
      // White's move
      acc.push({
        number: Math.floor(index / 2) + 1,
        white: move,
        black: ''
      });
    } else {
      // Black's move
      acc[Math.floor(index / 2)].black = move;
    }
    return acc;
  }, []);

  return (
    <Card className="p-4 w-full md:w-64 bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-4">Move History</h2>
      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          <div className="grid grid-cols-8 text-sm font-semibold mb-2 text-gray-600 px-2">
            <span className="col-span-2">#</span>
            <span className="col-span-3">White</span>
            <span className="col-span-3">Black</span>
          </div>
          <div className="space-y-1">
            {formattedMoves.map((moveSet, i) => (
              <div 
                key={i} 
                className="grid grid-cols-8 text-sm hover:bg-gray-50 rounded py-1 px-2"
              >
                <span className="col-span-2 text-gray-500">{moveSet.number}.</span>
                <span className="col-span-3 font-medium">{moveSet.white}</span>
                <span className="col-span-3 font-medium">{moveSet.black}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};

export default MoveHistory;