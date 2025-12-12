import { NextRequest, NextResponse } from 'next/server'

// GET /api/splits/[workId] - get split sheet for a work
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workId: string }> }
) {
  try {
    const { workId } = await params
    
    // TODO: Implement with database
    return NextResponse.json({ 
      splitSheet: null,
      message: 'Split sheet not found' 
    }, { status: 404 })
  } catch (error) {
    console.error('[SPLITS] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch split sheet' },
      { status: 500 }
    )
  }
}

// POST /api/splits/[workId] - create split sheet
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ workId: string }> }
) {
  try {
    const { workId } = await params
    const body = await request.json()
    
    // TODO: Implement with database
    console.log('[SPLITS] Create split sheet for work:', workId, body)
    
    return NextResponse.json({ 
      message: 'Split sheet creation not yet implemented',
      workId 
    }, { status: 201 })
  } catch (error) {
    console.error('[SPLITS] Error:', error)
    return NextResponse.json(
      { error: 'Failed to create split sheet' },
      { status: 500 }
    )
  }
}

// PATCH /api/splits/[workId] - update split sheet
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ workId: string }> }
) {
  try {
    const { workId } = await params
    const body = await request.json()
    
    // TODO: Implement with database
    console.log('[SPLITS] Update split sheet for work:', workId, body)
    
    return NextResponse.json({ 
      message: 'Split sheet update not yet implemented',
      workId 
    })
  } catch (error) {
    console.error('[SPLITS] Error:', error)
    return NextResponse.json(
      { error: 'Failed to update split sheet' },
      { status: 500 }
    )
  }
}
