# TradeSage - Base MiniKit Trading App

TradeSage is a comprehensive crypto trading automation and psychology tracking application built as a Base MiniKit app. It helps traders automate order placement, minimize slippage, journal trades with emotional context, and track rule adherence.

## Features

### 🤖 Automated Order Placement
- Define complex trade entry and exit rules
- Execute trades automatically based on indicators and price levels
- Support for multiple order types (market, limit, stop-limit, IOC, FOK)

### 📊 Slippage Minimization Tool
- Real-time market condition analysis
- Optimal order type and timing suggestions
- Volatility and liquidity assessment

### 📝 Trade Journal with Emotional Tagging
- Log trades with detailed information
- Tag emotional states before and after trades
- Track patterns between emotions and performance

### 🎯 Discipline Compliance Tracker
- Monitor adherence to trading rules
- Alert system for rule violations
- Performance analytics and insights

### 📈 Advanced Analytics
- Comprehensive performance metrics
- Emotional pattern analysis
- AI-powered trading insights
- Win/loss analysis and optimization recommendations

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **React**: React 19 (required for OnchainKit compatibility)
- **Blockchain**: Base network integration via OnchainKit
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **TypeScript**: Full type safety throughout

## Design System

### Theme Support
- **Default**: Professional finance theme with dark navy background and gold accents
- **CELO**: Black background with yellow accents
- **Solana**: Dark purple with magenta accents
- **Base**: Dark blue with Base blue accents
- **Coinbase**: Dark navy with Coinbase blue accents

### Components
- Responsive design with mobile-first approach
- Glass morphism effects for modern UI
- Consistent spacing and typography
- Accessible color contrasts and interactions

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## Project Structure

```
app/
├── components/          # Reusable UI components
├── journal/            # Trade journal pages
├── automation/         # Automation rules pages
├── analytics/          # Analytics and insights pages
├── theme-preview/      # Theme switching interface
├── globals.css         # Global styles and theme variables
├── layout.tsx          # Root layout with providers
├── page.tsx           # Dashboard page
└── providers.tsx      # OnchainKit and theme providers

lib/
├── types.ts           # TypeScript type definitions
├── constants.ts       # App constants and configuration
└── utils.ts          # Utility functions

components/
├── AppShell.tsx      # Main app navigation shell
├── Card.tsx          # Card component variants
├── Button.tsx        # Button component variants
├── Input.tsx         # Form input components
├── Chart.tsx         # Chart visualization components
└── ...               # Other reusable components
```

## Key Features Implementation

### Automation Rules
- Create entry, exit, and risk management rules
- Real-time rule execution monitoring
- Rule performance tracking

### Emotional Analysis
- Pre-defined emotion tags with color coding
- Correlation analysis between emotions and performance
- Pattern recognition for trading psychology insights

### Performance Analytics
- P&L tracking and visualization
- Win rate and profit factor calculations
- Trading pair performance analysis
- AI-powered insights and recommendations

## Base MiniKit Integration

- OnchainKit provider setup for Base network
- Wallet connection and identity components
- MiniKit hooks for frame integration
- Proper authentication flow with SIWF support

## Subscription Model

- **Free Tier**: Basic journal and discipline tracker
- **Pro Tier** ($15/mo): Automated orders and slippage tool
- **Premium Tier** ($25/mo): Advanced analytics and customization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
