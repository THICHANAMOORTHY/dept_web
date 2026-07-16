import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const DataTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflowX: 'auto'
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{ padding: '12px 24px', color: '#6b7280', fontSize: '0.875rem', fontWeight: '600' }}>
                {col.header}
              </th>
            ))}
            <th style={{ padding: '12px 24px', color: '#6b7280', fontSize: '0.875rem', fontWeight: '600', textAlign: 'right' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                No records found.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ borderBottom: '1px solid #e5e7eb' }}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} style={{ padding: '16px 24px', verticalAlign: 'middle' }}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(row)} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', marginRight: '16px' }}
                    >
                      <Pencil size={18} />
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(row)} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
