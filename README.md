# Menu Catalog API

A modern REST API for managing restaurant menu items with AI-powered features built with NestJS, Drizzle ORM, and Google Gemini AI.

## 🚀 Features

### Core Features
- ✅ **CRUD Operations** - Create, Read, Update, Delete menu items
- ✅ **Advanced Filtering** - Filter by category, price range, calories
- ✅ **Full-Text Search** - Search menu items by name
- ✅ **Pagination & Sorting** - Efficient data retrieval
- ✅ **Group by Category** - Organize menus by category

### AI-Powered Features (Google Gemini)
- 🤖 **Auto-Generated Descriptions** - AI creates appetizing menu descriptions automatically
- 🎯 **Smart Recommendations** - Personalized menu suggestions based on preferences

### Documentation
- 📚 **Swagger/OpenAPI** - Interactive API documentation at `/api`
- ✅ **Comprehensive Examples** - Real-world data examples in all endpoints

## 🛠️ Tech Stack

- **Framework**: NestJS 11
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **AI**: Google Gemini API (@google/genai)
- **Validation**: class-validator, class-transformer
- **Documentation**: @nestjs/swagger
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- Google Gemini API key ([Get one here](https://aistudio.google.com/apikey))
- pnpm (recommended) or npm

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmadahsins/gdgoc-study-case.git
   cd gdgoc-study-case
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/menu_catalog

   # Google Gemini API
   GEMINI_API_KEY=your_gemini_api_key_here

   # Application
   PORT=3000
   ```

4. **Run database migrations**
   ```bash
   pnpm drizzle-kit push
   ```

## 🚀 Running the Application

```bash
# Development mode with hot-reload
pnpm run start:dev

# Production mode
pnpm run build
pnpm run start:prod
```

The application will be available at:
- **API**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api

## 📚 API Documentation

### Swagger UI

Access the interactive API documentation at: **http://localhost:3000/api**

The Swagger UI provides:
- Complete endpoint documentation
- Request/response examples with real data
- Try-it-out functionality
- Schema definitions

### Available Endpoints

#### Menu CRUD Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/menu` | Create a new menu item (AI auto-description) |
| GET | `/menu` | Get all menus with filtering & pagination |
| GET | `/menu/:id` | Get a specific menu by ID |
| PUT | `/menu/:id` | Update a menu item |
| DELETE | `/menu/:id` | Delete a menu item |

#### Search & Filtering

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/menu/search` | Full-text search by name |
| GET | `/menu/group-by-category` | Group menus by category |

#### AI Features

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/menu/recommendations` | Get AI-powered menu recommendations |

### Query Parameters

**GET /menu** supports:
- `q` - Search query for menu name
- `category` - Filter by category (food, drinks)
- `min_price` - Minimum price filter
- `max_price` - Maximum price filter
- `max_cal` - Maximum calories filter
- `page` - Page number (default: 1)
- `per_page` - Items per page (default: 10)
- `sort` - Sort field and order (e.g., `price:asc`, `calories:desc`)

**Example:**
```
GET /menu?category=food&max_cal=600&sort=price:asc&page=1&per_page=10
```

## 🤖 AI Features Usage

### 1. Auto-Generated Descriptions

When creating a menu without a description, AI automatically generates one:

```bash
POST /menu
{
  "name": "Ayam Geprek Spesial",
  "category": "food",
  "calories": 520,
  "price": 18000,
  "ingredients": ["chicken", "chili", "batter", "garlic"]
  // description is optional - will be auto-generated
}
```

**AI-Generated Response:**
```json
{
  "message": "Menu created successfully",
  "data": {
    "id": 9,
    "description": "Hand-pounded for ultimate flavor, our crispy battered chicken is expertly crushed with a vibrant sambal of fresh chili and aromatic garlic..."
  }
}
```

### 2. Smart Recommendations

Get personalized menu recommendations based on preferences:

```bash
GET /menu/recommendations?max_calories=600&category=food&mood=spicy
```

**AI Response:**
```json
{
  "recommendations": [
    {
      "id": 9,
      "name": "Ayam Geprek",
      "category": "food",
      "calories": 520,
      "price": 18000
    }
  ],
  "reasoning": "This spicy dish perfectly matches your preference for bold flavors while staying under your 600-calorie limit..."
}
```

## 📁 Project Structure

```
src/
├── app.module.ts           # Root module
├── main.ts                 # Application entry point with Swagger setup
├── drizzle/               # Database configuration
│   ├── drizzle.module.ts
│   ├── schema.ts          # Database schema
│   └── types/
├── gemini/                # AI integration
│   ├── gemini.module.ts
│   └── gemini.service.ts  # Gemini API service
└── menu/                  # Menu feature module
    ├── menu.module.ts
    ├── menu.controller.ts # API endpoints
    ├── menu.service.ts    # Business logic
    └── dto/               # Data Transfer Objects
        ├── create-menu.dto.ts
        ├── update-menu.dto.ts
        ├── menu-query.dto.ts
        ├── search.dto.ts
        ├── group-by-category.dto.ts
        └── recomendation-query.dto.ts
```

## 🗄️ Database Schema

**Menus Table:**
```typescript
{
  id: serial (Primary Key)
  name: text (Not Null)
  category: text (Not Null)
  calories: integer (Not Null)
  price: decimal(10,2) (Not Null)
  ingredients: jsonb (Not Null)
  description: text (Not Null)
  created_at: timestamp (Default: now())
  updated_at: timestamp (Default: now())
}
```

## 🧪 Testing

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

## 📦 Database Migrations

```bash
# Generate migration
pnpm drizzle-kit generate

# Push schema to database
pnpm drizzle-kit push

# Open Drizzle Studio (Database GUI)
pnpm drizzle-kit studio
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |
| `GEMINI_API_KEY` | Google Gemini API key | ✅ Yes |
| `PORT` | Application port | ❌ No (default: 3000) |

## 🚀 Deployment

### Deploy to Render.com

1. **Create a Web Service**
   - Connect your GitHub repository
   - Select "Web Service"

2. **Configure Build Settings**
   
   **Build Command:**
   ```bash
   pnpm install && pnpm run build
   ```
   
   **Start Command:**
   ```bash
   pnpm run start:prod
   ```

3. **Set Environment Variables**
   ```
   DATABASE_URL=your_postgresql_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   PORT=3000
   NODE_ENV=production
   ```

4. **Database Setup**
   - Create a PostgreSQL database in Render
   - Copy the Internal Database URL
   - Add it as `DATABASE_URL` environment variable

### Memory Optimization

The project is configured with `NODE_OPTIONS='--max-old-space-size=512'` to work with Render's 512MB RAM limit on free tier.

### Deployment Troubleshooting

**Issue: Build timeout or memory errors**

Solutions:
1. Upgrade to Render Starter plan ($7/month) for 1GB RAM
2. Optimize build process by removing unused dependencies
3. Use production dependencies only: `pnpm install --prod`

## 🚨 Common Issues & Solutions

### Issue: Empty results when filtering

**Problem:** Query returns empty array
```
GET /menu?category=food&max_cal=300
```

**Solution:** Check if filter values match your data. For example, if all food items have >300 calories, increase `max_cal`:
```
GET /menu?category=food&max_cal=600
```

### Issue: AI features not working

**Problem:** Auto-description or recommendations fail

**Solution:** 
1. Verify `GEMINI_API_KEY` is set in `.env`
2. Check API key is valid at [Google AI Studio](https://aistudio.google.com/apikey)
3. Ensure you have internet connection

## 📝 Example Data

Sample menu items in the database:

```json
[
  {
    "id": 9,
    "name": "Ayam Geprek",
    "category": "food",
    "calories": 520,
    "price": 18000,
    "ingredients": ["chicken", "chili", "batter", "garlic"]
  },
  {
    "id": 5,
    "name": "Es Kopi Susu",
    "category": "drinks",
    "calories": 180,
    "price": 25000,
    "ingredients": ["coffee", "milk", "ice", "sugar"]
  }
]
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.

## 👨‍💻 Author

**Ahmad Ahsin**
- GitHub: [@ahmadahsins](https://github.com/ahmadahsins)

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Google Gemini](https://ai.google.dev/) - AI API for smart features
- [Swagger](https://swagger.io/) - API documentation

---

**Built with ❤️ using NestJS, Drizzle ORM, and Google Gemini AI**
