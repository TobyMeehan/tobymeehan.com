"use client"

import { useEffect, useRef } from "react"
import { createNoise2D } from "simplex-noise"

const simplex = createNoise2D()

type Blob = {
    radius: number

    speedX: number
    speedY: number

    points: BlobPoint[]

    hue: number
    hueNoiseOffset: number
}

type BlobPoint = {
    x: number
    y: number

    originX: number
    originY: number

    noiseOffsetX: number
    noiseOffsetY: number
}

type Point = {
    x: number
    y: number
}

export default function LavaCanvas() {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = ref.current

        if (!canvas) {
            return
        }

        let width = canvas.width = window.innerWidth * window.devicePixelRatio
        let height = canvas.height = window.innerHeight * window.devicePixelRatio

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth * window.devicePixelRatio
            height = canvas.height = window.innerHeight * window.devicePixelRatio
        })

        let mouseSpeedX = 0
        let mouseSpeedY = 0

        window.addEventListener("mousemove", event => {
            mouseSpeedX = event.movementX
            mouseSpeedY = event.movementY
        })

        const context = canvas.getContext("2d")

        const blobs: Blob[] = []

        for (let i = 0; i < 15; i++) {
            blobs.push(generateBlob(width, height))
        }

        let requestId: number
        const render = () => {
            context?.clearRect(0, 0, width, height)

            if (context) {
                drawBlobs(context, blobs)
                moveBlobs(blobs, width, height, mouseSpeedX, mouseSpeedY)
                mouseSpeedX = 0
                mouseSpeedY = 0
            }

            requestId = requestAnimationFrame(render)
        }

        render()

        return () => {
            cancelAnimationFrame(requestId)
        }
    }, [ref])

    return (
        <canvas ref={ref} className="fixed w-full h-full top-0"></canvas>
    )
}

function moveBlobs(blobs: Blob[], width: number, height: number, mouseSpeedX: number, mouseSpeedY: number) {
    blobs.forEach(blob => {
        const noiseStep = .0025

        blob.points.forEach(point => {

            // Apply speeds

            point.originX += blob.speedX + (mouseSpeedX / 75)
            point.originY -= blob.speedY - (mouseSpeedY / 40)

            // Apply animation

            const nX = simplex(point.noiseOffsetX, point.noiseOffsetX)
            const nY = simplex(point.noiseOffsetY, point.noiseOffsetY)

            const factor = blob.radius / 4

            const x = mapRange(nX, { start: -1, end: 1 }, { start: point.originX - factor, end: point.originX + factor })
            const y = mapRange(nY, { start: -1, end: 1 }, { start: point.originY - factor, end: point.originY + factor })

            point.x = x
            point.y = y

            point.noiseOffsetX += noiseStep
            point.noiseOffsetY += noiseStep

        })

        const nHue = simplex(blob.hueNoiseOffset, blob.hueNoiseOffset)
        blob.hue = mapRange(nHue, { start: -1, end: 1 }, { start: 225, end: 315 })

        blob.hueNoiseOffset += noiseStep / 6

        if (blob.points.every(point => point.y < -20)) {
            const newBlob = generateBlob(width, height, true)

            blob.points = newBlob.points
        }

    })
}

function mapRange(
    n: number,
    initialRange: { start: number, end: number },
    targetRange: { start: number, end: number }) {

    return ((n - initialRange.start) / (initialRange.end - initialRange.start)) *
        (targetRange.end - targetRange.start) + targetRange.start

}

function generateBlob(width: number, height: number, spawnAtBottom?: boolean): Blob {
    const radius = 60 + Math.random() * 200

    const x = Math.random() * width
    const y = spawnAtBottom ? height + radius : Math.random() * height

    const points: BlobPoint[] = []

    for (let j = 0; j < 6; j++) {
        const theta = j * (Math.PI * 2) / 6

        const pointX = x + Math.cos(theta) * radius
        const pointY = y + Math.sin(theta) * radius

        points.push({
            x: pointX,
            y: pointY,

            originX: pointX,
            originY: pointY,

            noiseOffsetX: Math.random() * 1000,
            noiseOffsetY: Math.random() * 1000,
        })
    }

    // Randomise rotation

    for (let j = 0; j < Math.floor(Math.random() * 6); j++) {
        const point = points.pop()

        if (point) {
            points.unshift(point)
        }
    }

    return {
        radius,

        speedX: 0,
        speedY: .5 - (radius / 1000),

        points: points,

        hue: 0,
        hueNoiseOffset: Math.random() * 1000,
    }
}

function drawBlobs(context: CanvasRenderingContext2D, blobs: Blob[]) {
    blobs.forEach(blob => {

        context.shadowColor = "#000000"
        context.shadowBlur = 10
        context.shadowOffsetX = 5
        context.shadowOffsetY = 5

        const tension = .4

        const points = blob.points.concat([])

        const controlPoints = getControlPoints(points, tension)

        context.beginPath()
        context.moveTo(points[0].x, points[0].y)

        const nPoints = blob.points.length

        for (let i = 0; i < nPoints; i++) {

            const nextIndex = i + 1 < nPoints ? i + 1 : 0

            const cp1 = controlPoints[i].cp2
            const cp2 = controlPoints[nextIndex].cp1

            const next = points[nextIndex]

            context.bezierCurveTo(cp1!.x, cp1!.y, cp2!.x, cp2!.y, next.x, next.y)

        }

        const gradientStart = 0
        const gradientEnd = Math.floor(blob.points.length / 2)

        const gradient = context.createLinearGradient(
            blob.points[gradientStart].x,
            blob.points[gradientStart].y,

            blob.points[gradientEnd].x,
            blob.points[gradientEnd].y,
        )

        gradient.addColorStop(0, `hsl(${blob.hue}, 100%, 17%)`)
        gradient.addColorStop(1, `hsl(${blob.hue + 60}, 100%, 17%)`)

        context.fillStyle = gradient
        context.fill()

    })
}

function getControlPoints(points: BlobPoint[], tension: number) {
    const controlPoints: { cp1: Point, cp2: Point }[] = []

    const n = points.length

    for (let i = 0; i < n; i++) {

        const p0 = points[i - 1] ?? points[n - 1]
        const p1 = points[i]
        const p2 = points[i + 1] ?? points[0]

        const d01 = Math.sqrt((p0.x - p1.x) ** 2 + (p0.y - p1.y) ** 2)
        const d12 = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

        const scalingFactorA = tension * d01 / (d01 + d12)
        const scalingFactorB = tension * d12 / (d01 + d12)

        const cp1: Point = {
            x: p1.x - scalingFactorA * (p2.x - p0.x),
            y: p1.y - scalingFactorA * (p2.y - p0.y)
        }

        const cp2: Point = {
            x: p1.x + scalingFactorB * (p2.x - p0.x),
            y: p1.y + scalingFactorB * (p2.y - p0.y)
        }

        controlPoints.push({ cp1, cp2 })
    }

    return controlPoints
}
