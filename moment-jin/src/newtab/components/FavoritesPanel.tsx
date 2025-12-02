import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { useTranslation } from "../hooks/useTranslation";
import type { Favorite } from "../types/index";
import { getFaviconUrl } from "../utils";

interface FavoritesPanelProps {
  isOpen: boolean;
  favorites: Favorite[];
  onToggle: () => void;
  onAddClick: () => void;
  onEditClick: (favorite: Favorite) => void;
  onDeleteClick: (id: string) => void;
  onOpenFavorite: (favorite: Favorite) => void;
  onReorder: (favorites: Favorite[]) => void;
}

interface SortableItemProps {
  fav: Favorite;
  onEditClick: (fav: Favorite) => void;
  onDeleteClick: (id: string) => void;
  onOpenFavorite: (fav: Favorite) => void;
  t: ReturnType<typeof useTranslation>["t"];
}

const SortableItem: React.FC<SortableItemProps> = ({ fav, onEditClick, onDeleteClick, onOpenFavorite, t }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: fav.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li ref={setNodeRef} style={style} className="favorites-item" onClick={() => onOpenFavorite(fav)}>
      <div className="favorites-main">
        <div
          className="favorites-drag-handle"
          {...attributes}
          {...listeners}
          style={{
            cursor: "grab",
            padding: "0 0.5rem",
            display: "flex",
            alignItems: "center",
            marginRight: "0.25rem",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span style={{ fontSize: "1rem", opacity: 0.5 }}>⋮⋮</span>
        </div>
        <div className="favorites-icon-wrapper">
          {fav.icon ? (
            <span className="favorites-custom-icon">{fav.icon}</span>
          ) : (
            <img
              src={getFaviconUrl(fav.url)}
              alt=""
              className="favorites-icon"
              onError={(e) => {
                e.currentTarget.src =
                  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><text y="14" font-size="14">🔖</text></svg>';
              }}
            />
          )}
        </div>
        <span className="favorites-link">{fav.label}</span>
      </div>

      <div className="favorites-actions">
        <button
          className="panel-small-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(fav);
          }}
          aria-label={t.common.edit}
        >
          ✎
        </button>
        <button
          className="panel-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick(fav.id);
          }}
          aria-label={t.common.delete}
        >
          ✕
        </button>
      </div>
    </li>
  );
};

export const FavoritesPanel: React.FC<FavoritesPanelProps> = ({
  isOpen,
  favorites,
  onToggle,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onOpenFavorite,
  onReorder,
}) => {
  const { t } = useTranslation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = favorites.findIndex((f) => f.id === active.id);
      const newIndex = favorites.findIndex((f) => f.id === over.id);

      const reordered = arrayMove(favorites, oldIndex, newIndex);
      onReorder(reordered);
    }
  };

  return (
    <aside className={`favorites-panel ${isOpen ? "open" : "collapsed"}`}>
      <div className="panel-header" onClick={onToggle} style={{ cursor: "pointer" }}>
        <button
          className="panel-toggle-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          aria-label={`${t.favorites.title} ${isOpen ? "collapse" : "expand"}`}
        >
          {isOpen ? "◀" : "▶"}
        </button>
        {isOpen && (
          <>
            <span className="panel-title">{t.favorites.title}</span>
            <button
              className="panel-icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                onAddClick();
              }}
              aria-label={t.favorites.add}
            >
              ＋
            </button>
          </>
        )}
      </div>
      {!isOpen && (
        <ul className="favorites-list-collapsed">
          {favorites.map((fav) => (
            <li key={fav.id} className="favorites-item-collapsed" onClick={() => onOpenFavorite(fav)} title={fav.label}>
              {fav.icon ? (
                <span className="favorites-custom-icon-collapsed">{fav.icon}</span>
              ) : (
                <img
                  src={getFaviconUrl(fav.url)}
                  alt={fav.label}
                  className="favorites-icon-collapsed"
                  onError={(e) => {
                    e.currentTarget.src =
                      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><text y="14" font-size="14">🔖</text></svg>';
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}

      {isOpen && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={favorites.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            <ul className="favorites-list">
              {favorites.map((fav) => (
                <SortableItem
                  key={fav.id}
                  fav={fav}
                  onEditClick={onEditClick}
                  onDeleteClick={onDeleteClick}
                  onOpenFavorite={onOpenFavorite}
                  t={t}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </aside>
  );
};
