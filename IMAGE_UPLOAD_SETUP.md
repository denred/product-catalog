# Image Upload Feature Setup

## Overview
Added support for both URL-based and file upload image functionality with automatic AWS S3 integration.

## Features Added

### Backend
1. **Upload Service** (`/backend/src/upload/`)
   - S3 file upload with validation
   - File type validation (JPEG, PNG, WebP, GIF)
   - File size validation (max 5MB)
   - Unique filename generation

2. **Upload Controller** 
   - `POST /upload/image` endpoint
   - JWT authentication required
   - Multipart/form-data support

### Frontend
1. **ImageUpload Component** (`/frontend/src/components/ImageUpload/`)
   - Dual mode: URL input or file upload
   - File drag-and-drop support
   - Image preview
   - Upload progress indication

2. **ProductFormModal Integration**
   - Replaced standard URL input with ImageUpload component
   - Maintains backward compatibility with URL input

## Setup Instructions

### 1. AWS S3 Configuration

Create an S3 bucket with public read access:

```bash
# Create S3 bucket (replace with your bucket name)
aws s3 mb s3://your-product-catalog-images

# Set bucket policy for public read access
aws s3api put-bucket-policy --bucket your-product-catalog-images --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-product-catalog-images/*"
    }
  ]
}'

# Enable public access block settings (if needed)
aws s3api put-public-access-block --bucket your-product-catalog-images --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false
```

### 2. Environment Variables

Add to your backend `.env` file:

```env
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-product-catalog-images
```

### 3. IAM User Permissions

Create an IAM user with the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::your-product-catalog-images/*"
    }
  ]
}
```

## Usage

### For Users
1. Open the product form (Add/Edit product)
2. In the Image section, choose between:
   - **URL**: Enter image URL directly
   - **Upload File**: Select and upload image file from computer
3. File uploads are automatically uploaded to S3 and URL is populated
4. Image preview shows immediately after upload/URL entry

### API Endpoints

#### Upload Image
```
POST /upload/image
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

Body: file (image file)

Response:
{
  "success": true,
  "url": "https://bucket.s3.region.amazonaws.com/products/uuid.jpg",
  "message": "File uploaded successfully"
}
```

## File Validation
- **Allowed types**: JPEG, PNG, WebP, GIF
- **Maximum size**: 5MB
- **Naming**: UUID-based filenames to prevent conflicts
- **Path**: Files stored in `products/` folder in S3

## Security
- JWT authentication required for uploads
- File type validation on backend
- File size limits enforced
- Public read access for serving images

## Cost Considerations
- S3 storage costs apply for uploaded files
- Consider implementing image optimization/compression
- Monitor bucket usage and set up lifecycle policies if needed

## Future Enhancements
- Image compression before upload
- Multiple image support per product
- Image editing capabilities
- CDN integration for faster delivery