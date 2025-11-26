import { useEffect, useRef } from "react";
import { usePageStore } from "../store/usePageStore";
import { BLOCKS } from "./rendered-blocks/blockDefinitions";

export function Canvas() {
  const page = usePageStore((s) => s.page);
  const selectBlock = usePageStore((s) => s.selectBlock);
  const selectedId = usePageStore((s) => s.selectedId);
  const fontFamily = usePageStore((s) => s.globalStyles.fontFamily);
  
    const lastBlockRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      console.log("scrolling to last block");
      if (!lastBlockRef.current) return;
      lastBlockRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }, [page.length]);
  
    return (
      <div
        className="flex-1 overflow-y-auto p-6 bg-white"
        role="main"
        aria-label="Canvas area"
        style={{ fontFamily }}
      >
        {page.length === 0 ? (
          <div className="text-center py-12 text-gray-500" aria-live="polite">
            <p>No blocks added yet. Use the sidebar to add blocks.</p>
          </div>
        ) : (
          <div role="list" aria-label="Page blocks">
            {page.map((block, index) => {
              const Comp = BLOCKS[block.type];
              const isLast = index === page.length - 1;
  
              return (
                <div
                  key={block.id}
                  ref={isLast ? lastBlockRef : null}
                  onClick={() => selectBlock(block.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${block.type} block${
                    block.id === selectedId ? ", selected" : ""
                  }`}
                  aria-selected={block.id === selectedId}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectBlock(block.id);
                    }
                  }}
                  className={`mb-4 ${
                    block.id === selectedId ? "ring-2 ring-blue-500 ring-offset-2" : ""
                  }`}
                >
                  <Comp {...block.props} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    )}