import React, { useMemo } from 'react';

export default function AnimatedBackground() {
    const particles = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 60
        }));
    }, []);

    return (
        <div className="animated-bg">
            <div className="gradient-overlay"></div>
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            {particles.map(p => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: `${p.left}%`,
                        bottom: '0',
                        animationDelay: `${p.delay}s`
                    }}
                />
            ))}
        </div>
    );
}