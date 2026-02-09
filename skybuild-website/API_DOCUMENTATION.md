# Skybuild API Documentation

Base URL: `http://localhost:5000/api` (Development)

## Table of Contents
1. [Authentication](#authentication)
2. [Projects](#projects)
3. [Services](#services)
4. [Contact](#contact)
5. [Testimonials](#testimonials)
6. [Error Handling](#error-handling)

---

## Authentication

### Register Admin
**POST** `/auth/register`

**Body:**
```json
{
  "username": "admin",
  "email": "admin@skybuild.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "username": "admin",
    "email": "admin@skybuild.com",
    "role": "admin",
    "token": "jwt_token_here"
  }
}
```

### Login
**POST** `/auth/login`

**Body:**
```json
{
  "username": "admin",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "username": "admin",
    "email": "admin@skybuild.com",
    "role": "admin",
    "token": "jwt_token_here"
  }
}
```

### Get Current User
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "username": "admin",
    "email": "admin@skybuild.com",
    "role": "admin"
  }
}
```

---

## Projects

### Get All Projects
**GET** `/projects`

**Query Parameters:**
- `category` (optional): house, villa, kothi, commercial, renovation
- `status` (optional): planning, in-progress, completed
- `featured` (optional): true, false

**Example:**
```
GET /projects?category=villa&status=completed
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "project_id",
      "title": "Modern Villa in Ludhiana",
      "description": "A beautiful 3-bedroom villa...",
      "category": "villa",
      "location": "Ludhiana, Punjab",
      "area": {
        "value": 2500,
        "unit": "sq ft"
      },
      "budget": 7500000,
      "duration": {
        "value": 12,
        "unit": "months"
      },
      "status": "completed",
      "images": [
        {
          "url": "https://example.com/image.jpg",
          "caption": "Front view"
        }
      ],
      "features": ["Swimming Pool", "Garden", "Modern Kitchen"],
      "client": {
        "name": "John Doe",
        "testimonial": "Excellent work!"
      },
      "completionDate": "2023-12-15T00:00:00.000Z",
      "featured": true,
      "createdAt": "2023-01-10T00:00:00.000Z",
      "updatedAt": "2023-12-20T00:00:00.000Z"
    }
  ]
}
```

### Get Single Project
**GET** `/projects/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "project_id",
    "title": "Modern Villa in Ludhiana",
    // ... full project details
  }
}
```

### Create Project (Protected)
**POST** `/projects`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Luxury Kothi",
  "description": "Grand 5-bedroom kothi with traditional architecture",
  "category": "kothi",
  "location": "Amritsar, Punjab",
  "area": {
    "value": 5000,
    "unit": "sq ft"
  },
  "budget": 15000000,
  "duration": {
    "value": 18,
    "unit": "months"
  },
  "status": "in-progress",
  "images": [
    {
      "url": "https://example.com/kothi.jpg",
      "caption": "Exterior view"
    }
  ],
  "features": [
    "Traditional Architecture",
    "Modern Amenities",
    "Large Garden",
    "Parking for 4 cars"
  ],
  "featured": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "new_project_id",
    // ... created project details
  }
}
```

### Update Project (Protected)
**PUT** `/projects/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:** (Same as create, but all fields optional)
```json
{
  "status": "completed",
  "completionDate": "2024-03-15"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    // ... updated project details
  }
}
```

### Delete Project (Protected)
**DELETE** `/projects/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## Services

### Get All Services
**GET** `/services`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "service_id",
      "name": "House Construction",
      "description": "Complete house construction services...",
      "shortDescription": "Build your dream home",
      "icon": "house",
      "image": "https://example.com/house.jpg",
      "features": [
        "Custom Design",
        "Quality Materials",
        "Timely Delivery"
      ],
      "pricing": {
        "startingFrom": 1500,
        "unit": "sq ft"
      },
      "active": true,
      "order": 1,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Service
**GET** `/services/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    // ... service details
  }
}
```

### Create Service (Protected)
**POST** `/services`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "Villa Construction",
  "description": "Luxury villa construction with premium finishes...",
  "shortDescription": "Build luxury villas",
  "features": [
    "Luxury Finishes",
    "Spacious Layouts",
    "Premium Amenities"
  ],
  "pricing": {
    "startingFrom": 2000,
    "unit": "sq ft"
  },
  "active": true,
  "order": 2
}
```

### Update Service (Protected)
**PUT** `/services/:id`

### Delete Service (Protected)
**DELETE** `/services/:id`

---

## Contact

### Submit Contact Form
**POST** `/contact`

**Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91 98765 43210",
  "projectType": "villa",
  "budget": "75-100 Lakhs",
  "location": "Chandigarh",
  "message": "I'm interested in building a villa. Please contact me."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you soon.",
  "data": {
    "_id": "contact_id",
    // ... contact details
  }
}
```

**Note:** This endpoint also sends an email notification to the admin.

### Get All Contacts (Protected)
**GET** `/contact`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): new, in-review, contacted, closed

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "contact_id",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+91 98765 43210",
      "projectType": "villa",
      "message": "I'm interested in building a villa...",
      "budget": "75-100 Lakhs",
      "location": "Chandigarh",
      "status": "new",
      "notes": "",
      "createdAt": "2024-02-04T00:00:00.000Z"
    }
  ]
}
```

### Update Contact Status (Protected)
**PUT** `/contact/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "status": "contacted",
  "notes": "Called customer, scheduled site visit for Feb 10"
}
```

---

## Testimonials

### Get Approved Testimonials
**GET** `/testimonials`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "testimonial_id",
      "clientName": "Rajesh Kumar",
      "clientImage": "https://example.com/client.jpg",
      "projectType": "house",
      "rating": 5,
      "testimonial": "Excellent work! Very professional team.",
      "location": "Ludhiana",
      "featured": true,
      "approved": true,
      "createdAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

### Get All Testimonials (Protected)
**GET** `/testimonials/all`

**Headers:**
```
Authorization: Bearer <token>
```

### Submit Testimonial
**POST** `/testimonials`

**Body:**
```json
{
  "clientName": "Priya Sharma",
  "projectType": "villa",
  "rating": 5,
  "testimonial": "Amazing experience! The team was professional...",
  "location": "Amritsar"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your testimonial! It will be reviewed shortly.",
  "data": {
    // ... testimonial details
    "approved": false  // Needs admin approval
  }
}
```

### Update Testimonial (Protected)
**PUT** `/testimonials/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "approved": true,
  "featured": true
}
```

### Delete Testimonial (Protected)
**DELETE** `/testimonials/:id`

---

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error (only in development mode)"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `404` - Not Found
- `500` - Internal Server Error

### Common Errors

**Validation Error:**
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Authentication Error:**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**Not Found Error:**
```json
{
  "success": false,
  "message": "Project not found"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting in production.

## CORS

CORS is configured to accept requests from `http://localhost:3000` by default. Update `CLIENT_URL` in `.env` for production.

---

**For more information, refer to the main README.md**
