import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, Badge } from '../../index';

/**
 * Reusable Interactive Quick Action Card.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {React.ComponentType} props.icon
 * @param {string} props.to - Destination route
 * @param {string} [props.badge]
 * @param {string} [props.badgeVariant='accent']
 */
export function QuickActionCard({
  title,
  description,
  icon: Icon,
  to,
  badge,
  badgeVariant = 'accent',
}) {
  return (
    <Link to={to} className="group block focus:outline-none">
      <Card
        padding="md"
        hoverable
        className="h-full flex flex-col justify-between group-focus:ring-2 group-focus:ring-accent"
      >
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div className="h-11 w-11 rounded-xl bg-accent-secondary text-accent flex items-center justify-center transition-all duration-200 group-hover:bg-accent group-hover:text-white shadow-subtle">
              {Icon && <Icon className="h-5 w-5" />}
            </div>

            {badge && (
              <Badge variant={badgeVariant} size="sm">
                {badge}
              </Badge>
            )}
          </div>

          <h3 className="text-base font-bold text-primary tracking-tight group-hover:text-accent transition-colors">
            {title}
          </h3>

          <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-accent">
          <span>Get Started</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </Card>
    </Link>
  );
}

export default QuickActionCard;
