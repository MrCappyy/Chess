import { Square, Piece } from 'chess.js';

interface BoardSquareProps {
  square: Square;
  piece: Piece | null;
  isSelected: boolean;
  isLegalMove: boolean;
  isDark: boolean;
  showRank: boolean;
  showFile: boolean;
  onClick: () => void;
}

const pieces: { [key: string]: string } = {
  'k': '♔', 'q': '♕', 'r': '♖', 'b': '♗', 'n': '♘', 
  'K': '♚', 'Q': '♛', 'R': '♜', 'B': '♝', 'N': '♞',
  'p': '♟', 'P': '♙'
};

const BoardSquare = ({
  square,
  piece,
  isSelected,
  isLegalMove,
  isDark,
  showRank,
  showFile,
  onClick
}: BoardSquareProps) => {
  const file = square[0];
  const rank = square[1];

  return (
    <div className="relative">
      <div
        className={`w-16 h-16 flex items-center justify-center text-4xl cursor-pointer
          ${isDark ? 'bg-chess-dark' : 'bg-chess-light'}
          transition-all duration-200 hover:opacity-90`}
        onClick={onClick}
      >
        {/* Overlay for legal moves */}
        {isLegalMove && (
          <div className="absolute inset-0 bg-green-500 opacity-50" />
        )}
        
        {/* Selection ring */}
        {isSelected && (
          <div className="absolute inset-0 ring-4 ring-blue-400" />
        )}

        {/* Piece */}
        {piece && (
          <span className={`relative z-10 animate-piece-appear ${piece.color === 'w' ? 'text-white drop-shadow-lg' : 'text-black drop-shadow-lg'}`}>
            {pieces[piece.type.toUpperCase()]}
          </span>
        )}

        {/* Rank and File labels */}
        {showRank && (
          <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-sm text-gray-600">
            {rank}
          </span>
        )}
        {showFile && (
          <span className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 text-sm text-gray-600">
            {file}
          </span>
        )}
      </div>
    </div>
  );
};

export default BoardSquare;