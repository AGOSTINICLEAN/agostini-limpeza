import { Card, CardContent } from '@/components/ui/Card';
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, change, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">{label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            {change !== undefined && (
              <p className={`text-sm mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '+' : ''}{change}% vs mês anterior
              </p>
            )}
          </div>
          {icon && <div className="text-4xl opacity-20">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
