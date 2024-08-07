import React, { useEffect, useState } from 'react';
import { ChangeStatusType } from '../ArancelCell/ArancelCell';

interface ChangeSummaryProps {
  changes: { changeStatus: ChangeStatusType }[];
  title?: (total: number) => string | string;
  newsText?: (news: number) => string | string;
  modifiedText?: (modified: number) => string | string;
  deletedText?: (deleted: number) => string | string;
}

// Estado actual de los cambios (diferente a changeStatus)
interface ChangeState {
    modified: number,
    news: number,
    deleted: number,
    total: number,
}

export default function ChangeSummary({ 
  changes, 
  title = (total) => total === 1 ? total + ' cambio': total + ' cambios',
  newsText = (news) => news === 1 ? 'Se agregó ' + news + ' elemento': 'Se agregaron ' + news + ' elementos',
  modifiedText = (modified) => modified === 1 ? 'Se modificó ' + modified + ' elemento': 'Se modificaron ' + modified + ' elementos',
  deletedText = (deleted) => deleted === 1 ? 'Se eliminó ' + deleted + ' elemento': 'Se eliminaron ' + deleted + ' elementos',
}: ChangeSummaryProps) {
  
  const initialState = {
    modified: 0,
    news: 0,
    deleted: 0,
    total: 0,
  } as ChangeState;

  const [ state, setState ] = useState(initialState);

  useEffect(() => {
    if (changes) {
      let modified = 0;
      let news = 0;
      let deleted = 0;

      changes.forEach((item) => {
        switch (item.changeStatus) {
          case 'modified':
            modified++;
            break;
          case 'new':
            news++;
            break;
          case 'deleted':
            deleted++;
            break;
        }
      });

      const newState = {
        modified: modified,
        news: news,
        deleted: deleted,
        total: modified + news + deleted,
      }

      setState(newState);
    }
  }, [changes]);
    
  return !state.modified && !state.news && !state.deleted ? (
    <div></div>
  ) : (
    <div className='text-gray-600'>
      <h4 className='font-bold text-sm'>
        { typeof title === 'string' ? title : title(state.total) }
      </h4>
      <div className='text-sm'>
        {state.news !== 0 && (
          <div className='flex gap-2 items-center'>
            <div className='w-2 h-2 rounded bg-green-600'></div>
            <p>
              { typeof newsText === 'string' ? newsText : newsText(state.news) }
            </p>
          </div>
        )}
        {state.modified !== 0 && (
          <div className='flex gap-2 items-center'>
            <div className='w-2 h-2 rounded bg-yellow-500'></div>
            <p>
              { typeof modifiedText === 'string' ? modifiedText : modifiedText(state.modified) }
            </p>
          </div>
        )}
        {state.deleted !== 0 && (
          <div className='flex gap-2 items-center'>
            <div className='w-2 h-2 rounded bg-red-600'></div>
            <p>
              { typeof deletedText === 'string' ? deletedText : deletedText(state.deleted) }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
