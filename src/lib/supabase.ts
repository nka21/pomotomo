import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Supabaseの環境変数が設定されていません。')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	realtime: {
		params: {
			eventsPerSecond: 5, // 1秒間に最大5個のイベントまで送信
		},
	},
})
