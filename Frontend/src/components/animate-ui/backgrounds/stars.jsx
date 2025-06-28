'use client';
import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { cn } from '../../../lib/utils'; // your utility for conditional classnames

function generateStars(count, starColor) {
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(', ');
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: 'linear' },
  starColor = '#fff',
  className,
  ...props
}) {
  const [boxShadow, setBoxShadow] = React.useState('');

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={cn(
        'absolute top-0 left-0 w-full h-[2000px] pointer-events-none will-change-transform',
        className
      )}
      {...props}
    >
      {/* Duplicate divs for continuous scrolling effect */}
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
          opacity: starColor === '#000000' ? 0.3 : 1, // reduce opacity for black stars on light bg
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
          opacity: starColor === '#000000' ? 0.3 : 1,
        }}
      />
    </motion.div>
  );
}

function StarsBackground({
  children,
  className,
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  pointerEvents = true,
  ...props
}) {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const [theme, setTheme] = React.useState('light');

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Initial theme detection
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    return () => observer.disconnect();
  }, []);

  // Background gradient based on theme
  const backgroundStyle =
    theme === 'dark'
      ? 'bg-black'
      : 'bg-white';

  // Star colors (white stars on dark bg, black stars on light bg)
  const starColor = theme === 'dark' ? 'white' : 'black';

  // Parallax movement based on mouse position relative to center
  const handleMouseMove = React.useCallback(
    (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newOffsetX = -(e.clientX - centerX) * factor;
      const newOffsetY = -(e.clientY - centerY) * factor;
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor]
  );

  return (
    <div
      data-slot="stars-background"
      className={cn('relative w-full h-full overflow-hidden', backgroundStyle, className)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className={cn({ 'pointer-events-none': !pointerEvents }, 'will-change-transform')}
      >
        <StarLayer
          count={1000}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
          starColor={starColor}
        />
        <StarLayer
          count={400}
          size={2}
          transition={{ repeat: Infinity, duration: speed * 2, ease: 'linear' }}
          starColor={starColor}
        />
        <StarLayer
          count={200}
          size={3}
          transition={{ repeat: Infinity, duration: speed * 3, ease: 'linear' }}
          starColor={starColor}
        />
      </motion.div>

      {children}
    </div>
  );
}

export { StarLayer, StarsBackground };
