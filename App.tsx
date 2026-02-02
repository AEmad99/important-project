import React, { useState, useCallback } from 'react';
import Background from './components/Background';
import Confetti from './components/Confetti';
import Button from './components/Button';
import { SUCCESS_IMAGE, PHRASES, BACKGROUND_IMAGES } from './constants';
import { Heart } from 'lucide-react';

function App() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState<{ top: string; left: string } | null>(null);

  const handleNoInteraction = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault(); // Stop any default scrolling/focus jumps
    setNoCount((prev) => prev + 1);

    const card = document.querySelector('.valentine-card');
    if (!card) {
      console.error("Valentine Card not found!");
      return;
    }

    const cardRect = card.getBoundingClientRect();

    // Attempt to measure button, or use safe defaults
    let btnW = 150;
    let btnH = 50;
    const currentBtn = document.querySelector('button.no-button') as HTMLElement || document.querySelector('[style*="position: fixed"] button') as HTMLElement;
    if (currentBtn) {
      const rect = currentBtn.getBoundingClientRect();
      if (rect.width > 0) btnW = rect.width;
      if (rect.height > 0) btnH = rect.height;
    }

    // Heuristic: The text grows, so the button will be wider on next render.
    // We add a safety buffer or clamp to a minimum expected size for the "Next" state.
    // Longest phrase is ~30 chars => ~300-350px.
    const ESTIMATED_MAX_W = 350;
    // We use the larger of current or max check to ensure we don't clip the right side
    // if the button grows significantly.
    const safeW = Math.max(btnW, ESTIMATED_MAX_W);

    const gap = 15; // Gap for safety
    // Use clientWidth to exclude scrollbars and ensure we are within the rendered area
    const screenW = document.documentElement.clientWidth || window.innerWidth;
    const screenH = document.documentElement.clientHeight || window.innerHeight;

    console.group("No Button Debug Fixed");
    console.log("Window InnerWidth (App):", window.innerWidth);
    console.log("Doc ClientWidth (App):", screenW);
    console.log("Card Rect:", cardRect);

    console.log("Screen:", { w: screenW, h: screenH });
    console.log("Button Current:", { w: btnW, h: btnH });
    console.log("Button Safe Width Used:", safeW);

    // Define the 4 cardinal positions around the card
    // We prioritize LEFT and RIGHT as requested.

    // Position 1: Right Shoulder
    const posRight = {
      left: cardRect.right + gap,
      top: cardRect.top + (Math.random() * (cardRect.height - btnH)), // Random height within card
      label: 'right'
    };

    // Position 2: Left Shoulder
    const posLeft = {
      left: cardRect.left - btnW - gap, // Keep visual tightness based on current size
      top: cardRect.top + (Math.random() * (cardRect.height - btnH)),
      label: 'left'
    };

    console.log("Calculated Positions:", { posLeft, posRight });

    // Check availability
    // To fit on the right: Right Edge (Left + SafeW) < ScreenW
    const fitsRight = (posRight.left + safeW < screenW - 10);
    // To fit on the left: Left Edge > 10
    const fitsLeft = (posLeft.left > 10);

    console.log("Fits:", { fitsLeft, fitsRight });

    // Decide
    let finalPos;

    // 1. Try to toggle between Left/Right if they fit
    if (fitsLeft && fitsRight) {
      finalPos = Math.random() > 0.5 ? posRight : posLeft;
    } else if (fitsRight) {
      finalPos = posRight;
    } else if (fitsLeft) {
      finalPos = posLeft;
    } else {
      // 2. If sides are squeezed (mobile), go vertical
      // Center horizontally relative to card
      const centeredLeft = cardRect.left + (cardRect.width / 2) - (btnW / 2);

      const posTop = {
        left: centeredLeft,
        top: cardRect.top - btnH - gap,
        label: 'top'
      };
      const posBottom = {
        left: centeredLeft,
        top: cardRect.bottom + gap,
        label: 'bottom'
      };
      finalPos = posBottom; // default to bottom if squeezed
      if (posTop.top > 10) finalPos = posTop;

      console.log("Squeezed! Fallback used:", finalPos.label);
    }

    // EXTRA SAFETY: Ensure it didn't somehow end up off-screen
    // We clamp the LEFT coordinate.
    // Max Left = ScreenWidth - SafeWidth - Margin.
    // This ensures that even if it grows to SafeWidth, the right edge is onscreen.
    const maxLeft = screenW - safeW - 20;
    const clampedLeft = Math.max(10, Math.min(maxLeft, finalPos.left));
    const clampedTop = Math.max(10, Math.min(screenH - btnH - 10, finalPos.top));

    console.log("Final Clamped:", { clampedLeft, clampedTop, maxLeft });
    console.groupEnd();

    setNoButtonPosition({
      top: `${clampedTop}px`,
      left: `${clampedLeft}px`,
    });
  }, []);

  const getNoButtonText = () => {
    return PHRASES[Math.min(noCount, PHRASES.length - 1)];
  };

  const yesButtonScale = Math.min(1 + noCount * 0.1, 2.5);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative font-sans text-slate-800">
      <Background />

      {accepted && <Confetti />}

      <div className="valentine-card z-10 bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center border-4 border-valentine-200 transition-all duration-500">

        {accepted ? (
          <div className="animate-fade-in flex flex-col items-center gap-6">
            <div className="relative">
              <img
                src={SUCCESS_IMAGE}
                alt="Celebration Cat"
                className="w-64 h-64 object-cover rounded-full border-8 border-valentine-300 shadow-xl animate-bounce"
              />
              <Heart className="absolute -top-4 -right-4 w-12 h-12 text-valentine-500 fill-valentine-500 animate-pulse" />
              <Heart className="absolute -bottom-2 -left-2 w-8 h-8 text-valentine-400 fill-valentine-400 animate-pulse delay-100" />
            </div>

            <h1 className="text-4xl md:text-5xl font-handwriting text-valentine-600 font-bold leading-tight">
              Yay!!! I knew it! <br />
              <span className="text-2xl md:text-3xl text-valentine-500 font-sans mt-2 block">
                Best Valentine Ever! ❤️
              </span>
            </h1>
            <p className="text-lg text-slate-600">Yaaaaaaaaaaaaaay</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            <div className="relative group">
              <img
                src={BACKGROUND_IMAGES[1]}
                alt="Please be my valentine"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-lg border-4 border-valentine-200 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-6 -right-6 bg-white p-2 rounded-full shadow-lg rotate-12 animate-wiggle">
                <Heart className="w-10 h-10 text-valentine-500 fill-valentine-500" />
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-handwriting text-valentine-800 font-bold">
              Will you be my Valentine? 🌹
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-4 w-full relative min-h-[80px]">
              <Button
                onClick={() => setAccepted(true)}
                style={{ transform: `scale(${yesButtonScale})` }}
                className="z-20 origin-center transition-transform duration-200"
              >
                Yes, absolutely! 💖
              </Button>

              {/* Only show the static/initial No button here */}
              {!noButtonPosition && (
                <Button
                  variant="danger"
                  onClick={handleNoInteraction}
                  onMouseEnter={handleNoInteraction}
                  onTouchStart={handleNoInteraction}
                >
                  {getNoButtonText()}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Render the floating No button here, outside the card context to avoid backdrop-filter issues */}
      {noButtonPosition && (
        <div
          style={{
            position: 'fixed', // Use fixed to be safe relative to viewport, as App has relative
            top: noButtonPosition.top,
            left: noButtonPosition.left,
            zIndex: 50,
            transition: 'all 0.3s ease-out',
          }}
        >
          <Button
            variant="danger"
            onClick={handleNoInteraction}
            onMouseEnter={handleNoInteraction}
            onTouchStart={handleNoInteraction}
          >
            {getNoButtonText()}
          </Button>
        </div>
      )}

      <footer className="absolute bottom-4 text-valentine-800/60 text-sm font-semibold">
        Made with ❤️ for you
      </footer>
    </div>
  );
}

export default App;
