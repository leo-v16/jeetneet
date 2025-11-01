import { useState, useEffect, FormEvent } from 'react';

type Exam = {
  id: number;
  name: string;
  description: string;
  popularity: number;
};

export default function ExamCms() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [popularity, setPopularity] = useState(0);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);

  useEffect(() => {
    fetch('/api/exams')
      .then((res) => res.json())
      .then((data) => setExams(data));
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log('Submitting form...');

    const examData = { name, description, popularity };
    console.log('Exam data:', examData);

    if (editingExam) {
      console.log('Updating exam:', editingExam.id);
      // Update existing exam
      const response = await fetch(`/api/exams/${editingExam.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData),
      });
      const updatedExam = await response.json();
      console.log('Updated exam:', updatedExam);
      setExams(exams.map((exam) => (exam.id === updatedExam.id ? updatedExam : exam)));
      setEditingExam(null);
    } else {
      console.log('Creating new exam');
      // Create new exam
      const response = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData),
      });
      const newExam = await response.json();
      console.log('New exam:', newExam);
      setExams([...exams, newExam]);
    }

    // Reset form
    setName('');
    setDescription('');
    setPopularity(0);
  };

  const handleEdit = (exam: Exam) => {
    console.log('Editing exam:', exam);
    setEditingExam(exam);
    setName(exam.name);
    setDescription(exam.description);
    setPopularity(exam.popularity);
  };

  const handleDelete = async (id: number) => {
    console.log('Deleting exam:', id);
    await fetch(`/api/exams/${id}`, {
      method: 'DELETE',
    });
    setExams(exams.filter((exam) => exam.id !== id));
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Exam Management</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Exam Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="popularity" className="block text-gray-700 font-bold mb-2">
            Popularity
          </label>
          <input
            type="number"
            id="popularity"
            value={popularity}
            onChange={(e) => setPopularity(parseInt(e.target.value, 10))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {editingExam ? 'Update Exam' : 'Add Exam'}
        </button>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-4">Existing Exams</h2>
        <ul>
          {exams.map((exam) => (
            <li key={exam.id} className="mb-4 p-4 border rounded shadow-sm">
              <h3 className="text-lg font-bold">{exam.name}</h3>
              <p>{exam.description}</p>
              <p>Popularity: {exam.popularity}</p>
              <div className="mt-4">
                <button
                  onClick={() => handleEdit(exam)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exam.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
