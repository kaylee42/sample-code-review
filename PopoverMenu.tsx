import React, { useRef, useState, useEffect } from 'react';
// This is an SVG of three dots - it has gone through preprocessing and will render when used as <EllipsesMenuIcon />
import EllipsesMenuIcon from './EllipsesMenuIcon.svg';

interface PopoverMenuItem {
  name: string;
  onSelect: () => void;
  key: number;
  href?: string;
}

interface PopoverMenuProps {
  menuItems: PopoverMenuItem[];
  useButtonForSecondItem: boolean;
}

function FocusableLinks({
  menuItems,
  closeMenu,
  useButtonForSecondItem = false,
}: PopoverMenuProps & { closeMenu: () => void }) {
  const linkRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    linkRefs.current[0]?.focus();
  }, [linkRefs]);

  /**
   * Handles the blur event for the menu item
   * @param index - index of the menu item
   */
  const handleBlur = (index: number) => {
    if (index === menuItems.length - 1) {
      closeMenu();
    }
  };

  return (
    <ul>
      {menuItems.map((item, index) => (
        <React.Fragment key={item.key}>
          <li>
            {useButtonForSecondItem && index === 1 ? (
              <button
                type="button"
                ref={el => {
                  linkRefs.current[index] = el;
                }}
                onClick={item.onSelect}
                onBlur={() => handleBlur(index)}
              >
                {item.name}
              </button>
            ) : (
              <a
                href={item.href}
                ref={el => {
                  linkRefs.current[index] = el;
                }}
                onClick={item.onSelect}
                target="_blank"
                onBlur={() => handleBlur(index)}
                onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
                  if (e.key === ' ') {
                    item.onSelect();
                  }
                }}
                rel="noreferrer"
              >
                {item.name}
              </a>
            )}
          </li>
          {index < menuItems.length - 1 && (
            <div className="horizontal-divider" />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}

function PopoverMenu({ menuItems, useButtonForSecondItem }: PopoverMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div>
      <button
        type="button"
        ref={buttonRef}
        aria-expanded={isOpen}
        aria-controls="popover-menu"
        onClick={toggleMenu}
      >
        <EllipsesMenuIcon />
      </button>

      {isOpen && (
        <div ref={popoverRef} id="popover-menu">
          <FocusableLinks
            menuItems={menuItems}
            closeMenu={closeMenu}
            useButtonForSecondItem={useButtonForSecondItem}
          />
        </div>
      )}
    </div>
  );
}

export default PopoverMenu;
