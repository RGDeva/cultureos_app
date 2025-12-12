import { NextRequest, NextResponse } from 'next/server'
import { EarningsSummary } from '@/types/profile'

/**
 * GET /api/earnings?userId=xxx
 * Returns NoCulture OS earnings summary
 * TODO: Integrate with actual purchase/bounty tracking
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    // TODO: Query actual purchases and bounties from database
    // For now, return mock data
    const earnings: EarningsSummary = {
      totalEarned: 2450.00,
      thisMonth: 380.00,
      pendingPayouts: 125.00,
      breakdown: {
        marketplaceAssets: 1200.00,
        marketplaceServices: 950.00,
        vaultBounties: 300.00
      }
    }

    console.log('[EARNINGS_API] Generated earnings for user:', userId)

    return NextResponse.json(earnings)
  } catch (error) {
    console.error('[EARNINGS_API] Error:', error)
    // Never throw - return zero earnings
    return NextResponse.json({
      totalEarned: 0,
      thisMonth: 0,
      pendingPayouts: 0,
      breakdown: {
        marketplaceAssets: 0,
        marketplaceServices: 0,
        vaultBounties: 0
      }
    })
  }
}

/**
 * POST /api/earnings
 * Add earnings from CSV/JSON payload
 * TODO: Implement with database when ready
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { earnings } = body

    if (!earnings || !Array.isArray(earnings)) {
      return NextResponse.json(
        { error: 'Earnings array is required' },
        { status: 400 }
      )
    }

    // TODO: Implement with database
    console.log('[EARNINGS] Received earnings:', earnings.length)

    return NextResponse.json({ 
      message: 'Earnings received',
      count: earnings.length 
    }, { status: 201 })
  } catch (error) {
    console.error('[EARNINGS] Error adding earnings:', error)
    return NextResponse.json(
      { error: 'Failed to add earnings' },
      { status: 500 }
    )
  }
}
