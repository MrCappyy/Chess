import React, { useState, useEffect } from 'react';
import { Chess, Square } from 'chess.js';
import { Card } from './ui/card';
import { toast } from './ui/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import SettingsButton from './SettingsButton';
import BoardSquare from './chess/BoardSquare';
import MoveHistory from './chess/MoveHistory';

const ChessBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [moves, setMoves] = useState<string[]>([]);
  const [moveAssistEnabled, setMoveAssistEnabled] = useState(false);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const isAIMode = location.pathname === '/play/ai';

  useEffect(() => {
    // Update moves whenever the game state changes
    setMoves(game.history());
  }, [game]);

  const makeAIMove = () => {
    const possibleMoves = game.moves();
    if (possibleMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      const move = possibleMoves[randomIndex];
      game.move(move);
      const newGame = new Chess(game.fen());
      setGame(newGame);
      setMoves(newGame.history());
      checkGameStatus(newGame);
    }
  };

  const checkGameStatus = (currentGame: Chess) => {
    if (currentGame.isCheckmate()) {
      toast({
        title: "Checkmate!",
        description: `${currentGame.turn() === 'w' ? 'Black' : 'White'} wins!`,
      });
    } else if (currentGame.isStalemate()) {
      toast({
        title: "Stalemate!",
        description: "The game is a draw.",
      });
    } else if (currentGame.isDraw()) {
      toast({
        title: "Draw!",
        description: "The game is a draw due to insufficient material or repetition.",
      });
    } else if (currentGame.isCheck()) {
      toast({
        title: "Check!",
        description: `${currentGame.turn() === 'w' ? 'White' : 'Black'} is in check!`,
      });
    }
  };

  const handleDownload = () => {
    const pgn = game.pgn();
    const blob = new Blob([pgn], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chess-game.pgn';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Game Downloaded",
      description: "Your game has been saved as a PGN file.",
    });
  };

  const handleSquareClick = (square: Square) => {
    if (selectedSquare === null) {
      const piece = game.get(square);
      if (piece && piece.color === (game.turn() === 'w' ? 'w' : 'b')) {
        setSelectedSquare(square);
        if (moveAssistEnabled) {
          const moves = game.moves({ square, verbose: true });
          setLegalMoves(moves.map(move => move.to as Square));
        }
      }
    } else {
      try {
        const move = game.move({
          from: selectedSquare,
          to: square,
          promotion: 'q'
        });
        
        if (move) {
          const newGame = new Chess(game.fen());
          setGame(newGame);
          setMoves(newGame.history());
          checkGameStatus(newGame);

          if (isAIMode && !newGame.isGameOver()) {
            setTimeout(makeAIMove, 500);
          }
        }
      } catch (e) {
        // Invalid move
      }
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };

  const squares: Square[] = [];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  for (let i = 0; i < 64; i++) {
    const file = files[i % 8];
    const rank = ranks[Math.floor(i / 8)];
    squares.push(`${file}${rank}` as Square);
  }

  const handleMoveAssistToggle = (enabled: boolean) => {
    setMoveAssistEnabled(enabled);
    if (!enabled) {
      setLegalMoves([]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="w-full flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Game
          </Button>
          <SettingsButton onMoveAssistToggle={handleMoveAssistToggle} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <Card className="p-4 bg-white shadow-xl rounded-lg border-4 border-chess-border">
          <div className="pl-6 pb-6">
            <div className="grid grid-cols-8 w-fit">
              {squares.map((square, i) => (
                <BoardSquare
                  key={square}
                  square={square}
                  piece={game.get(square)}
                  isSelected={selectedSquare === square}
                  isLegalMove={legalMoves.includes(square)}
                  isDark={(Math.floor(i / 8) + i % 8) % 2 === 1}
                  showRank={square[0] === 'a'}
                  showFile={square[1] === '1'}
                  onClick={() => handleSquareClick(square)}
                />
              ))}
            </div>
          </div>
        </Card>
        
        <MoveHistory moves={moves} />
      </div>
    </div>
  );
};

export default ChessBoard;
