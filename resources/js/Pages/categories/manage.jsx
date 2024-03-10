import React from 'react';
import CategoriesList from './CategoriesList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const App = ({auth}) => {
  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create an Event</h2>}
        >
    <div>
      <CategoriesList />
    </div>
    </AuthenticatedLayout>
  );
};

export default App;
