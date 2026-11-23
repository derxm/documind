import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';

function NotFoundPage() {
  return (
    <div className="text-center py-24 max-w-md mx-auto">
      <span className="text-7xl font-extrabold text-border block mb-4 select-none">
        404
      </span>
      <h1 className="text-2xl font-bold text-primary mb-2">Page Not Found</h1>
      <p className="text-sm text-text-secondary mb-8 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary" leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Return to Home
        </Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
