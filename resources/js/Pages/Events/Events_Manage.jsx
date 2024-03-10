import React from 'react';
import { Button, Card, CardBody, CardHeader, Container, DataTable, TableBody, TableContainer, TableColumn, TableRow } from '@windmill/react-ui';

const SampleForm = () => {
  return (
    <Container>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Sample Form</h2>
        </CardHeader>
        <CardBody>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="description" name="description" rows="3" className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" id="location" name="location" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" id="date" name="date" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
              <input type="text" id="duration" name="duration" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <Button type="submit" className="mr-2" size="small">Submit</Button>
            <Button type="button" size="small">Cancel</Button>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default SampleForm;
