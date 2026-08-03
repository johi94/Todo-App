"use client";

import { useEffect, useRef, useState } from "react";
import { isInsideRect, clamp } from "../lib/geometry";
import { NOTE_HALF, NOTE_SIZE } from "../components/noteSize";

type UseNoteDragOptions = {
  onMove: (id: string, x: number, y: number) => void;
  onCreate?: (x: number, y: number) => void;
  onTrash: (id: string) => void;
};

export function useNoteDrag({ onMove, onCreate, onTrash }: UseNoteDragOptions) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isOverTrash, setIsOverTrash] = useState(false);
  const trashRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLElement>(null);
  const callbacksRef = useRef({ onMove, onCreate, onTrash });

  useEffect(() => {
    callbacksRef.current = { onMove, onCreate, onTrash };
  });

  function startDragExisting(event: React.PointerEvent, id: string) {
    setDraggingId(id);
    setDragPosition({ x: event.clientX, y: event.clientY });
  }

  function startDragNew(event: React.PointerEvent) {
    setDraggingId(null);
    setDragPosition({ x: event.clientX, y: event.clientY });
  }

  function tryTrashDrop(clientX: number, clientY: number, id: string | null) {
    const trashBounds = trashRef.current?.getBoundingClientRect();
    if (!id || !trashBounds) return false;
    if (!isInsideRect(clientX, clientY, trashBounds)) return false;
    callbacksRef.current.onTrash(id);
    return true;
  }

  function tryPlaceOnBoard(
    clientX: number,
    clientY: number,
    id: string | null,
  ) {
    const bounds = boardRef.current?.getBoundingClientRect();
    if (!bounds || !isInsideRect(clientX, clientY, bounds)) return;
    const x = clamp(
      clientX - bounds.left - NOTE_HALF,
      0,
      bounds.width - NOTE_SIZE,
    );
    const y = clamp(
      clientY - bounds.top - NOTE_HALF,
      0,
      bounds.height - NOTE_SIZE,
    );
    if (id) {
      callbacksRef.current.onMove(id, x, y);
    } else {
      callbacksRef.current.onCreate?.(x, y);
    }
  }

  const isDragging = dragPosition !== null;

  useEffect(() => {
    document.body.style.cursor = isDragging ? "grabbing" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging) return;
    function handleMove(event: PointerEvent) {
      setDragPosition({ x: event.clientX, y: event.clientY });
      const trashBounds = trashRef.current?.getBoundingClientRect();
      setIsOverTrash(
        draggingId !== null &&
          trashBounds !== undefined &&
          isInsideRect(event.clientX, event.clientY, trashBounds),
      );
    }
    function handleUp(event: PointerEvent) {
      if (!tryTrashDrop(event.clientX, event.clientY, draggingId)) {
        tryPlaceOnBoard(event.clientX, event.clientY, draggingId);
      }
      setDraggingId(null);
      setDragPosition(null);
      setIsOverTrash(false);
    }
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [isDragging, draggingId]);

  return {
    draggingId,
    dragPosition,
    isOverTrash,
    isDragging,
    trashRef,
    boardRef,
    startDragExisting,
    startDragNew,
  };
}
