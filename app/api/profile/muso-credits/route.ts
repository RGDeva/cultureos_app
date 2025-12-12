import { NextRequest, NextResponse } from 'next/server'
import { profileStore } from '@/lib/profileStore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, credit } = body

    if (!userId || !credit) {
      return NextResponse.json(
        { error: 'userId and credit are required' },
        { status: 400 }
      )
    }

    // Get current profile
    const profile = profileStore.get(userId)
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Add credit to profile
    const musoCredits = profile.musoCredits || []
    musoCredits.push({
      id: `credit-${Date.now()}`,
      ...credit,
    })

    // Update profile
    profileStore.update(userId, { musoCredits })

    return NextResponse.json({
      message: 'Muso credit added successfully',
      musoCredits,
    })
  } catch (error) {
    console.error('[MUSO_CREDITS] Error:', error)
    return NextResponse.json(
      { error: 'Failed to add Muso credit' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const profile = profileStore.get(userId)
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      musoCredits: profile.musoCredits || [],
    })
  } catch (error) {
    console.error('[MUSO_CREDITS] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Muso credits' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, creditId } = body

    if (!userId || !creditId) {
      return NextResponse.json(
        { error: 'userId and creditId are required' },
        { status: 400 }
      )
    }

    const profile = profileStore.get(userId)
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Remove credit
    const musoCredits = (profile.musoCredits || []).filter(
      (credit) => credit.id !== creditId
    )

    profileStore.update(userId, { musoCredits })

    return NextResponse.json({
      message: 'Muso credit removed successfully',
      musoCredits,
    })
  } catch (error) {
    console.error('[MUSO_CREDITS] Error:', error)
    return NextResponse.json(
      { error: 'Failed to remove Muso credit' },
      { status: 500 }
    )
  }
}
