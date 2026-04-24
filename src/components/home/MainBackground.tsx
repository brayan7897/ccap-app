"use client"

import { useEffect, useRef, useState } from "react"
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

  const [showConstellations, setShowConstellations] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  // Effect para manejar los cambios de tema y el responsive
  useEffect(() => {
    const checkState = () => {
      const isDark = document.documentElement.classList.contains("dark")
      const isDesktop = window.innerWidth >= 768
      
      setIsDarkTheme(isDark)
      // Deshabilitamos constelaciones en dispositivos móviles por rendimiento y en tema claro por diseño
      setShowConstellations(isDark && isDesktop)
    }

    checkState()

    const observer = new MutationObserver(checkState)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    window.addEventListener("resize", checkState)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", checkState)
    }
  }, [])

  // Effect para la animación del canvas
  useEffect(() => {
    if (!showConstellations) return

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

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

    let rgbColor = '51, 136, 255'; // default

    const hexToRgb = (hex: string) => {
      hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '51, 136, 255';
    };

    const computedStyles = getComputedStyle(document.documentElement)
    let primaryColor = computedStyles.getPropertyValue("--primary").trim()
    if (primaryColor) {
      if (primaryColor.startsWith("hsl")) {
        // Simple fallback
        rgbColor = '51, 136, 255'
      } else {
        rgbColor = hexToRgb(primaryColor.split(" ")[0] || primaryColor)
      }
    }

    const nodes: Node[] = []
    const cols = Math.ceil(Math.sqrt(count * (width / height)))
    const rows = Math.ceil(count / cols)
    const cellWidth = width / cols
    const cellHeight = height / rows

    for (let i = 0; i < count; i++) {
        const col = i % cols
        const row = Math.floor(i / cols)
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

    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width
      canvas.height = height
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      const nodeAlpha = 1;
      const lineAlpha = 0.15;
      const glowAlpha = 0.4;

      const nodeColorAlpha = `rgba(${rgbColor}, ${nodeAlpha})`
      const lineColorAlpha = `rgba(${rgbColor}, ${lineAlpha})`
      const glowColorAlpha = `rgba(${rgbColor}, ${glowAlpha})`

      for (const node of nodes) {
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

        node.x += node.vx
        node.y += node.vy
        node.vx *= 0.99
        node.vy *= 0.99
        node.vx += (Math.random() - 0.5) * 0.01
        node.vy += (Math.random() - 0.5) * 0.01

        if (node.x < 0 || node.x > width) {
          node.vx *= -1
          node.x = Math.max(0, Math.min(width, node.x))
        }
        if (node.y < 0 || node.y > height) {
          node.vy *= -1
          node.y = Math.max(0, Math.min(height, node.y))
        }
      }

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

      ctx.globalAlpha = 1
      for (const node of nodes) {
        ctx.fillStyle = nodeColorAlpha
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
        
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
    }
  }, [showConstellations, count, connectionDistance, nodeSize, mouseRadius, glow])

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none bg-background transition-colors duration-700", className)}
    >
      {showConstellations && (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-auto" />
      )}

      {/* Sombras y mallas solo en dark theme, manteniendo limpio en light theme */}
      {isDarkTheme && (
        <>
            <div
                className="pointer-events-none absolute inset-0 opacity-10 mix-blend-screen"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, var(--primary) 0%, transparent 50%)",
                }}
            />

            <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 0%, transparent 50%, hsl(var(--background) / 0.8) 100%)",
                }}
            />

            <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] bg-[length:32px_32px] pointer-events-none transition-opacity duration-700" />
        </>
      )}

      {/* Content layer */}
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  )
}
