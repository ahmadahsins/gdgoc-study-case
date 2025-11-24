# Menu Catalog API - Swagger Documentation

## 🚀 Quick Start

### Accessing Swagger UI

Once the application is running, you can access the interactive Swagger documentation at:

```
http://localhost:3000/api
```

### Starting the Application

```bash
# Development mode
pnpm start:dev

# Production mode
pnpm build
pnpm start:prod
```

## 📚 API Overview

The Menu Catalog API provides comprehensive endpoints for managing restaurant menu items with AI-powered features.

### Base URL
```
http://localhost:3000
```

### API Documentation URL
```
http://localhost:3000/api
```

## 🏷️ API Tags

The API is organized into three main categories:

### 1. **menu** - Menu CRUD Operations
- Create, read, update, and delete menu items
- Get menu by ID
- List all menus with filtering and pagination

### 2. **search** - Menu Search and Filtering
- Full-text search
- Group by category
- Advanced filtering (price, calories, category)

### 3. **ai** - AI-Powered Features
- Auto-generated menu descriptions (using Google Gemini AI)
- Personalized menu recommendations

## 📖 Endpoints

### Menu CRUD Operations

#### `POST /menu` - Create Menu Item
Creates a new menu item. If `description` is not provided, it will be auto-generated using AI.

**Request Body:**
```json
{
  "name": "Nasi Goreng Spesial",
  "category": "main_course",
  "calories": 450,
  "price": 35000,
  "ingredients": ["rice", "chicken", "egg", "vegetables", "soy_sauce"],
  "description": "Optional - will be auto-generated if not provided"
}
```

**Response:**
```json
{
  "message": "Menu created successfully",
  "data": {
    "id": 1,
    "name": "Nasi Goreng Spesial",
    "category": "main_course",
    "calories": 450,
    "price": 35000,
    "ingredients": ["rice", "chicken", "egg", "vegetables", "soy_sauce"],
    "description": "A flavorful Indonesian fried rice dish...",
    "created_at": "2025-11-25T06:00:00.000Z",
    "updated_at": "2025-11-25T06:00:00.000Z"
  }
}
```

---

#### `GET /menu` - List All Menus
Retrieves menu items with optional filtering, sorting, and pagination.

**Query Parameters:**
- `q` - Search query for menu name
- `category` - Filter by category (main_course, appetizer, dessert, drinks, snacks)
- `min_price` - Minimum price filter
- `max_price` - Maximum price filter
- `max_cal` - Maximum calories filter
- `page` - Page number (default: 1)
- `per_page` - Items per page (default: 10)
- `sort` - Sort field and order (e.g., `price:asc`, `calories:desc`)

**Example:**
```
GET /menu?category=drinks&max_cal=500&sort=price:asc&page=1&per_page=10
```

---

#### `GET /menu/:id` - Get Menu by ID
Retrieves a single menu item by its ID.

**Example:**
```
GET /menu/1
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "Nasi Goreng Spesial",
    "category": "main_course",
    "calories": 450,
    "price": 35000,
    "ingredients": ["rice", "chicken", "egg"],
    "description": "Delicious fried rice"
  }
}
```

---

#### `PUT /menu/:id` - Update Menu Item
Updates an existing menu item. All fields are optional.

**Request Body:**
```json
{
  "name": "Nasi Goreng Premium",
  "price": 45000,
  "calories": 500
}
```

---

#### `DELETE /menu/:id` - Delete Menu Item
Deletes a menu item by ID.

**Response:**
```json
{
  "message": "Menu deleted successfully"
}
```

---

### Search & Filtering

#### `GET /menu/search` - Full-Text Search
Search menu items by name with pagination.

**Query Parameters:**
- `q` (required) - Search query
- `page` - Page number (default: 1)
- `per_page` - Items per page (default: 10)

**Example:**
```
GET /menu/search?q=coffee&page=1&per_page=10
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Es Kopi Susu",
      "category": "drinks",
      "calories": 180,
      "price": 25000
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "per_page": 10
  }
}
```

---

#### `GET /menu/group-by-category` - Group by Category
Groups menu items by category.

**Query Parameters:**
- `mode` (required) - `count` or `list`
- `per_category` - Number of items per category (only for `list` mode, default: 5)

**Example (Count Mode):**
```
GET /menu/group-by-category?mode=count
```

**Response:**
```json
{
  "data": {
    "main_course": 15,
    "drinks": 8,
    "dessert": 5
  }
}
```

**Example (List Mode):**
```
GET /menu/group-by-category?mode=list&per_category=3
```

**Response:**
```json
{
  "data": {
    "main_course": [
      { "id": 1, "name": "Nasi Goreng", "category": "main_course", "price": 35000 }
    ],
    "drinks": [
      { "id": 2, "name": "Es Kopi Susu", "category": "drinks", "price": 25000 }
    ]
  }
}
```

---

### AI-Powered Features

#### `GET /menu/recommendations` - AI Menu Recommendations
Get personalized menu recommendations using Google Gemini AI.

**Query Parameters:**
- `max_calories` - Maximum calories preference
- `category` - Preferred category
- `dietary_restrictions` - Comma-separated restrictions (e.g., "vegetarian,halal")
- `mood` - Current mood/occasion (healthy, comfort food, quick lunch, refreshing, energizing)

**Example:**
```
GET /menu/recommendations?max_calories=500&category=drinks&mood=refreshing
```

**Response:**
```json
{
  "recommendations": [
    {
      "id": 3,
      "name": "Es Kopi Susu",
      "category": "drinks",
      "calories": 180,
      "price": 25000,
      "ingredients": ["coffee", "milk", "ice", "sugar"],
      "description": "Classic iced coffee with milk"
    }
  ],
  "reasoning": "These drinks are perfect for a refreshing experience. The Es Kopi Susu offers a creamy, energizing boost while staying under your 500-calorie limit."
}
```

---

## 🎨 Features

### 1. Auto-Generated Descriptions
When creating a menu item without a description, the API uses Google Gemini AI to generate an appetizing, professional description based on:
- Menu name
- Category
- Ingredients
- Calories

### 2. AI-Powered Recommendations
The recommendation endpoint uses Google Gemini AI to analyze:
- User preferences (calories, category, dietary restrictions, mood)
- Available menu items
- Nutritional information

It returns the top 3 recommended items with reasoning.

### 3. Advanced Filtering
- Filter by category, price range, and calories
- Full-text search by name
- Sorting by multiple fields
- Pagination support

### 4. Validation
All inputs are validated using class-validator decorators:
- Required fields are enforced
- Data types are validated
- Enum values are restricted
- Minimum values are checked

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Application
PORT=3000
```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

---

## 📝 Response Schemas

### Menu Item Schema
```typescript
{
  id: number;
  name: string;
  category: 'main_course' | 'appetizer' | 'dessert' | 'drinks' | 'snacks';
  calories: number;
  price: number;
  ingredients: string[];
  description: string;
  created_at: string;
  updated_at: string;
}
```

### Standard Success Response
```typescript
{
  message?: string;
  data: MenuItemSchema | MenuItemSchema[];
}
```

### Pagination Response
```typescript
{
  data: MenuItemSchema[];
  pagination: {
    total: number;
    page: number;
    per_page: number;
  }
}
```

### AI Recommendation Response
```typescript
{
  recommendations: MenuItemSchema[];
  reasoning: string;
}
```

---

## 🧪 Testing with Swagger UI

1. **Start the application**: `pnpm start:dev`
2. **Open Swagger UI**: Navigate to `http://localhost:3000/api`
3. **Explore endpoints**: Click on any endpoint to see details
4. **Try it out**: Click "Try it out" button
5. **Fill parameters**: Enter required parameters/body
6. **Execute**: Click "Execute" to send the request
7. **View response**: See the response below

---

## 🎯 Best Practices

### Creating Menu Items
- Always provide meaningful ingredient lists for better AI-generated descriptions
- Use consistent category names
- Ensure price and calories are accurate

### Using Recommendations
- Combine multiple preferences for better results
- Use specific mood keywords for more relevant recommendations
- Dietary restrictions should be comma-separated

### Pagination
- Use reasonable `per_page` values (10-50)
- Always check `pagination.total` to know total available items

---

## 🐛 Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["name should not be empty"],
  "error": "Bad Request"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Menu with ID 999 not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## 📦 Dependencies

- **@nestjs/swagger** - OpenAPI/Swagger documentation
- **@google/genai** - Google Gemini AI SDK
- **drizzle-orm** - Database ORM
- **class-validator** - Input validation
- **class-transformer** - Object transformation

---

## 🚀 Deployment

When deploying to production:

1. Set `NODE_ENV=production`
2. Ensure all environment variables are set
3. Consider disabling Swagger in production or protecting it with authentication
4. Use proper database connection pooling
5. Implement rate limiting for AI endpoints

---

## 📞 Support

For issues or questions:
- Check the Swagger UI for detailed endpoint documentation
- Review error messages for validation issues
- Ensure environment variables are properly configured
- Verify database connection

---

## 📄 License

This project is licensed under UNLICENSED.
