import { NextRequest, NextResponse } from 'next/server'

// GET /api/works - list works
export async function GET(request: NextRequest) {
  try {
    // TODO: Implement with database
    return NextResponse.json({ works: [] })
  } catch (error) {
    console.error('[WORKS] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch works' },
      { status: 500 }
    )
  }
}

// POST /api/works - create work
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // TODO: Implement with database
    console.log('[WORKS] Create work:', body)
    
    return NextResponse.json({ 
      message: 'Work creation not yet implemented'
    }, { status: 201 })
  } catch (error) {
    console.error('[WORKS] Error:', error)
    return NextResponse.json(
      { error: 'Failed to create work' },
      { status: 500 }
    )
  }
}
