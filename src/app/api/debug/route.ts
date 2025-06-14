import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
	// 本番環境では完全に無効化
	if (process.env.NODE_ENV === 'production') {
		return new NextResponse('Not Found', { status: 404 })
	}

	const { searchParams } = new URL(request.url)
	const action = searchParams.get('action')

	switch (action) {
		case 'db-test':
			return await handleDbTest()
		case 'env-check':
			return await handleEnvCheck()
		default:
			return NextResponse.json({
				message: 'Debug API - Development Only',
				available: ['db-test', 'env-check'],
				usage: {
					'db-test': '/api/debug?action=db-test',
					'env-check': '/api/debug?action=env-check',
				},
			})
	}
}

/**
 * /api/debug?action=db-test で実行
 * @returns データベース接続テスト
 */
async function handleDbTest() {
	try {
		const { data: rooms, error: roomsError } = await supabase
			.from('rooms')
			.select('*')
			.limit(1)

		const { data: timers, error: timersError } = await supabase
			.from('timers')
			.select('*')
			.limit(1)

		// == successがtrueの場合は、正常にデータ接続できている ==
		return NextResponse.json({
			database: {
				rooms: {
					success: !roomsError,
					error: roomsError?.message,
					count: rooms?.length || 0,
				},
				timers: {
					success: !timersError,
					error: timersError?.message,
					count: timers?.length || 0,
				},
			},
		})
	} catch (error) {
		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		)
	}
}

/**
 * /api/debug?action=env-check で実行
 * @returns 環境変数の確認
 */
async function handleEnvCheck() {
	return NextResponse.json({
		env: {
			supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
			supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			nodeEnv: process.env.NODE_ENV,
		},
	})
}
