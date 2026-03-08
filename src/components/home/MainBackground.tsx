"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface MainBackgroundProps {
  className?: string
  children?: React.ReactNode
  /** Number of nodes */
  count?: number
  /** Maximum distance for connections */
  connectionDistance?: number
  /** Node size */
  nodeSize?: number
  /** Mouse repulsion radius */
  mouseRadius?: number
  /** Enable glow effect */
  glow?: boolean
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function MainBackground({
  className,
  children,
  count = 100,
  connectionDistance = 150,
  nodeSize = 1,
  mouseRadius = 100,
  glow = true,
}: MainBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // Setting alpha: true so the CSS background defined by light/dark modes can show through
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    let width = rect.width
    let height = rect.height
    canvas.width = width
    canvas.height = height

    let animationId: number
    let mouseX = -1000
    let mouseY = -1000

    // Color management
    let rgbColor = '51, 136, 255'; // default #3388FF fallback
    let isDark = true;

    const hexToRgb = (hex: string) => {
      // Expand shorthand form (e.g. "03F" to "0033FF")
      hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '51, 136, 255';
    };

    const updateColor = () => {
      const computedStyles = getComputedStyle(document.documentElement)
      let primaryColor = computedStyles.getPropertyValue("--primary").trim()
      if (primaryColor) {
        rgbColor = hexToRgb(primaryColor)
      }
      isDark = document.documentElement.classList.contains("dark")
    }
    
    updateColor()

    // Watch for theme changes (dark mode toggle)
    const observer = new MutationObserver(() => updateColor())
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] })

    // Create nodes with a grid-based distribution for better uniformity
    const nodes: Node[] = []
    
    // Calcula cuántas columnas y filas necesitamos para repartir 'count' nodos
    const cols = Math.ceil(Math.sqrt(count * (width / height)))
    const rows = Math.ceil(count / cols)
    
    const cellWidth = width / cols
    const cellHeight = height / rows

    for (let i = 0; i < count; i++) {
        // Asignamos cada nodo a una celda de la cuadrícula
        const col = i % cols
        const row = Math.floor(i / cols)
        
        // Posición base dentro de la celda + un jittering (desplazamiento aleatorio dentro de la misma celda)
        // Esto crea un patrón "uniforme pero caótico" natural
        const x = (col * cellWidth) + (Math.random() * cellWidth)
        const y = (row * cellHeight) + (Math.random() * cellHeight)

        nodes.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * nodeSize + nodeSize * 0.3,
        })
    }

    // Mouse handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    // Resize handler
    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width
      canvas.height = height
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    // Animation
    const animate = () => {
      // Clear the canvas to be transparent
      ctx.clearRect(0, 0, width, height)
      
      const nodeAlpha = isDark ? 1 : 0.6;
      const lineAlpha = isDark ? 0.15 : 0.05;
      const glowAlpha = isDark ? 0.4 : 0.1;

      const nodeColorAlpha = `rgba(${rgbColor}, ${nodeAlpha})`
      const lineColorAlpha = `rgba(${rgbColor}, ${lineAlpha})`
      const glowColorAlpha = `rgba(${rgbColor}, ${glowAlpha})`

      // Update nodes
      for (const node of nodes) {
        // ... (resto igual)
        // Mouse repulsion
        if (mouseRadius > 0) {
          const dx = node.x - mouseX
          const dy = node.y - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouseRadius && dist > 0) {
            const force = ((mouseRadius - dist) / mouseRadius) * 0.02
            node.vx += (dx / dist) * force
            node.vy += (dy / dist) * force
          }
        }

        // Apply velocity with damping
        node.x += node.vx
        node.y += node.vy
        node.vx *= 0.99
        node.vy *= 0.99

        // Add slight random movement
        node.vx += (Math.random() - 0.5) * 0.01
        node.vy += (Math.random() - 0.5) * 0.01

        // Bounce off edges
        if (node.x < 0 || node.x > width) {
          node.vx *= -1
          node.x = Math.max(0, Math.min(width, node.x))
        }
        if (node.y < 0 || node.y > height) {
          node.vy *= -1
          node.y = Math.max(0, Math.min(height, node.y))
        }
      }

      // Draw connections
      ctx.strokeStyle = lineColorAlpha
      ctx.lineWidth = 0.8
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            const opacity = 1 - dist / connectionDistance
            ctx.globalAlpha = opacity * 0.4
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      ctx.globalAlpha = 1
      for (const node of nodes) {
        // Core
        ctx.fillStyle = nodeColorAlpha
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
        
        // Glow (Optimización: en lugar de crear un CanvasGradient pesado en CADA cuadro 
        // para cada partícula, solo dibujamos un segundo arco con opacidad muy baja)
        if (glow) {
          ctx.fillStyle = glowColorAlpha
          ctx.beginPath()
          const glowRadius = node.radius * 2.5
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      ro.disconnect()
      observer.disconnect()
    }
  }, [count, connectionDistance, nodeSize, mouseRadius, glow])

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none bg-background transition-colors duration-700", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-auto" />

      {/* Subtle radial gradient overlay matched with theme primary */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-10 mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, var(--primary) 0%, transparent 50%)",
        }}
      />

      {/* Vignette using standard foreground with opacity instead of hardcoded black, lighter for light mode */}
      <div
        className="pointer-events-none absolute inset-0 dark:opacity-100 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(var(--background), 0.8) 100%)",
        }}
      />

      {/* Malla SaaS - Cuadrícula vectorial sutil mantenida de la original para añadir textura */}
      <div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.10] bg-[radial-gradient(circle,var(--color-border)_1px,transparent_1px)] bg-[length:32px_32px] pointer-events-none transition-opacity duration-700" />

      {/* Content layer */}
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  )
}
