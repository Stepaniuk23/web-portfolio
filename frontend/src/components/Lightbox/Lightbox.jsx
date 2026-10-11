import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import NavigationArrow from "../NavigationArrow/NavigationArrow";
import "./Lightbox.css";

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swipeTransition, setSwipeTransition] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(-1);
  const pointerStart = useRef(null);
  const previousIndex = useRef(index);
  const swipeTimer = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useLayoutEffect(() => {
    if (previousIndex.current === index) return;
    previousIndex.current = index;
    pointerStart.current = null;
    setSwipeOffset(0);
    setSwipeTransition(false);
  }, [index]);

  useEffect(
    () => () => {
      window.clearTimeout(swipeTimer.current);
    },
    [],
  );

  const handlePointerDown = (event) => {
    if (event.pointerType !== "touch" || images.length < 2) return;

    pointerStart.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    setSwipeTransition(false);
    setSwipeOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!pointerStart.current || pointerStart.current.id !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - pointerStart.current.x;
    const deltaY = event.clientY - pointerStart.current.y;

    if (Math.abs(deltaY) > Math.abs(deltaX)) return;
    if (deltaX !== 0) setSwipeDirection(deltaX < 0 ? -1 : 1);
    setSwipeOffset(deltaX);
  };

  const finishPointerGesture = (event) => {
    if (!pointerStart.current || pointerStart.current.id !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - pointerStart.current.x;
    pointerStart.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (images.length < 2) return;

    if (Math.abs(deltaX) < Math.max(48, window.innerWidth * 0.12)) {
      setSwipeTransition(true);
      setSwipeOffset(0);
      return;
    }

    const direction = deltaX < 0 ? -1 : 1;
    setSwipeDirection(direction);
    setSwipeTransition(true);
    setSwipeOffset(direction * window.innerWidth);
    swipeTimer.current = window.setTimeout(() => {
      if (direction < 0) {
        onNext();
      } else {
        onPrev();
      }
    }, 400);
  };

  const cancelPointerGesture = (event) => {
    if (!pointerStart.current || pointerStart.current.id !== event.pointerId) {
      return;
    }

    pointerStart.current = null;
    setSwipeTransition(true);
    setSwipeOffset(0);
  };

  useEffect(() => {
    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;
    const rootStyle = document.documentElement.style;
    const previousStyles = {
      position: bodyStyle.position,
      top: bodyStyle.top,
      left: bodyStyle.left,
      right: bodyStyle.right,
      width: bodyStyle.width,
      overflow: bodyStyle.overflow,
      rootOverflow: rootStyle.overflow,
      rootScrollBehavior: rootStyle.scrollBehavior,
    };

    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.left = "0";
    bodyStyle.right = "0";
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";
    rootStyle.overflow = "hidden";

    return () => {
      rootStyle.scrollBehavior = "auto";
      bodyStyle.position = previousStyles.position;
      bodyStyle.top = previousStyles.top;
      bodyStyle.left = previousStyles.left;
      bodyStyle.right = previousStyles.right;
      bodyStyle.width = previousStyles.width;
      bodyStyle.overflow = previousStyles.overflow;
      rootStyle.overflow = previousStyles.rootOverflow;
      window.scrollTo(0, scrollY);
      rootStyle.scrollBehavior = previousStyles.rootScrollBehavior;
    };
  }, []);

  if (index === null || index === undefined || !images[index]) return null;

  const current = images[index];
  const adjacentIndex =
    (index + (swipeDirection < 0 ? 1 : -1) + images.length) % images.length;
  const adjacent = images.length > 1 ? images[adjacentIndex] : null;
  const slideTransition = swipeTransition
    ? "transform var(--transition-smooth)"
    : "none";
  const currentTransform = `translate3d(calc(-50% + ${swipeOffset}px), -50%, 0)`;
  const adjacentTransform = `translate3d(calc(-50% + ${swipeOffset - swipeDirection * window.innerWidth}px), -50%, 0)`;

  return createPortal(
    <div className="lightbox" onClick={onClose}>
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close"
        title="Close"
      >
        &times;
      </button>

      <NavigationArrow
        direction="left"
        variant="dark"
        className="lightbox-arrow left"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
        title="Previous photo"
      />

      <div
        className="lightbox-image-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerGesture}
        onPointerCancel={cancelPointerGesture}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <img
          className="lightbox-img"
          src={current.src}
          alt={current.alt || ""}
          draggable="false"
          onClick={(event) => event.stopPropagation()}
          style={{ transform: currentTransform, transition: slideTransition }}
        />
        {adjacent && (
          <img
            className="lightbox-img lightbox-img-adjacent"
            src={adjacent.src}
            alt={adjacent.alt || ""}
            draggable="false"
            aria-hidden="true"
            onClick={(event) => event.stopPropagation()}
            style={{
              transform: adjacentTransform,
              transition: slideTransition,
            }}
          />
        )}
      </div>

      <NavigationArrow
        direction="right"
        variant="dark"
        className="lightbox-arrow right"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
        title="Next photo"
      />
    </div>,
    document.body,
  );
}

export default Lightbox;
