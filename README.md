# ポモとも！

## 🎯 サービス概要

友達や仲間と“部屋”を作り、同じタイミングでポモドーロ・テクニックに基づいた作業・休憩サイクルを共有できる、シンプルなタイマーWebアプリです。

### ✨ 主な体験

-   **リアルタイム同期**: 部屋名を決めて作業を開始すると、全員が同じタイマー進行を共有し、集中できます。
-   **途中参加も簡単**: 途中から参加しても、その時点のタイマー状態に即座に同期されます。

## 📦 機能要件

### 部屋の作成と参加

-   **フロー**: ホーム画面 → 部屋名入力 → タイマー画面
-   **部屋名**:
    -   20文字以内
    -   既存の部屋名なら参加、なければ新規作成
-   **人数制限**: 1部屋あたり最大10人

### タイマー仕様

-   **サイクル**: 作業25分＋休憩5分を1サイクルとし、4サイクル目には15分の長い休憩時間を設けます。
-   **状態管理**: フェーズ（作業/休憩/長休憩）、残り時間、サイクル数はサーバーで一元管理します。
-   **同期**: 参加者は全員、常に同じタイマー状態に同期されます。
-   **通知**: 作業や休憩の終了時に効果音が鳴ります。
-   **自動削除**: 全員が退出すると、部屋とタイマーは自動的に削除されます。

### UI/UX

-   **レスポンシブデザイン**: スマートフォンとPCの両方で快適に利用できます。
-   **情報表示**: 進行状況、残り時間、参加人数を常に表示します。
-   **リロード時の挙動**: ページをリロードした場合、部屋に再接続します。（※要検討：ホームに戻すべきか？）

## 💻 技術スタック・開発方針

-   **フレームワーク**: Next.js (App Router) + TypeScript
-   **パッケージ管理**: pnpm
-   **ビルドツール**: Turbopack
-   **バックエンド/DB**: Supabase (PostgreSQL, Realtime, Auth)
-   **スタイリング**: Tailwind CSS
-   **状態管理**: TanStack Query (SWR) for Server State, Zustand/Context for UI State
-   **フォーム**: React Hook Form + Zod

### 設計パターン


-   **[Container/Presentational パターン](https://zenn.dev/akfm/books/nextjs-basic-principle/viewer/part_2_container_1st_design)**:
    -   **Container Component (Server Component)**: データフェッチやビジネスロジックを担当。`app/**/_containers` に配置。
    -   **Presentational Component (Client/Server Component)**: UIの表示に特化。Propsでデータを受け取る。`app/**/_components` に配置。
```
app
├── <Segment>
│  ├── page.tsx
│  ├── layout.tsx
│  ├── _containers
│  │  ├── <Container Name>
│  │  │  ├── index.tsx
│  │  │  ├── container.tsx
│  │  │  ├── presentational.tsx
│  │  │  └── ...
│  │  └── ...
│  ├── _components // 汎用的なClient Components
│  ├── _lib // 汎用的な関数など
│  └── ...
└── ...
```


## 🔗 API設計 (WebSocketベース)

タイマーや参加者リストのようなリアルタイム性が求められる状態は、HTTPポーリングではなくSupabase Realtime (WebSocket) を用いて同期します。

### REST API

| エンドポイント               | メソッド | 概要                                       | 主なレスポンス                                    |
| -------------------------- | -------- | ------------------------------------------ | ------------------------------------------------- |
| `POST /api/rooms`          | `POST`   | 新規部屋作成、または既存部屋への参加情報取得 | `{ roomId, roomName, isNew }`                     |
| `GET /api/rooms/{roomName}`| `GET`    | 部屋の存在確認や参加人数を取得             | `{ exists: boolean, participantsCount: number }` |

### WebSocket (Supabase Realtime)

-   **Channel**: `room:${roomId}`
    -   クライアントは部屋ページにアクセス後、このチャンネルを購読します。

-   **Events**:
    -   **`PRESENCE`**:
        -   **`sync`**: チャンネル参加時に現在の参加者リストを受け取ります。
        -   **`join`**: 新しいユーザーが参加したことを通知します。
        -   **`leave`**: ユーザーが退出したことを通知します。
    -   **`TIMER_STATE` (Broadcast)**:
        -   タイマーの状態が更新されるたびに全クライアントに配信されます。
        -   **Payload**: `{ phase: 'work' | 'short_break' | 'long_break', startedAt: string, cycle: number }`

### ユーザー識別

-   匿名UUIDをクライアントの `localStorage` で管理します。
-   Supabase Realtimeへの接続時やAPIリクエスト時にこのIDを利用してユーザーを識別します。

## 📝 DBスキーマ案 (Supabase/PostgreSQL)

-   **`rooms`**
    -   `id` (uuid, pk)
    -   `name` (text, unique)
    -   `created_at` (timestamptz)

-   **`timers`**
    -   `room_id` (uuid, pk, fk to rooms.id)
    -   `phase` (enum: 'work', 'short_break', 'long_break')
    -   `started_at` (timestamptz)
    -   `cycle_count` (integer)
    -   `updated_at` (timestamptz)

## 🚨 セキュリティ

-   部屋名入力時のXSS対策 (DOMPurifyなど)
-   APIリクエストのバリデーション (Zod)
-   サーバーサイドでの人数制限やロジック検証

## ✅ 今後の検討事項

-   **エラーハンドリング**:
    -   APIエラー、WebSocket切断時にToastやモーダルでユーザーにフィードバックするUIを実装する。
    -   Supabase Edge Functionのエラー監視とロギング。
-   **効果音**:
    -   具体的な音源の選定と、クライアント側での再生実装。
-   **テスト戦略**:
    -   **Unit (Jest/Vitest + RTL)**: `useTimer`のようなカスタムフックや、UIコンポーネントのテスト。
    -   **E2E (Playwright)**: 複数ユーザーが部屋に参加し、タイマーが同期されるかという、このアプリのコアなシナリオを自動テストする。
