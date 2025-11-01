import { useState, useEffect, FormEvent } from 'react';

type Exam = {
  id: number;
  name: string;
  description: string;
  popularity: number;
};

type ExamOption = {
  id: number;
  name: string;
  description: string;
  href: string;
};

type ExamYear = {
  id: number;
  year: number;
};

type PYQ = {
  id: number;
  question: string;
  answer: string;
};

export default function ExamCms() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [popularity, setPopularity] = useState(0);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);

  const [options, setOptions] = useState<ExamOption[]>([]);
  const [optionName, setOptionName] = useState('');
  const [optionDescription, setOptionDescription] = useState('');
  const [optionHref, setOptionHref] = useState('');
  const [editingOption, setEditingOption] = useState<ExamOption | null>(null);

  const [years, setYears] = useState<ExamYear[]>([]);
  const [yearValue, setYearValue] = useState(0);
  const [editingYear, setEditingYear] = useState<ExamYear | null>(null);

  const [pyqs, setPyqs] = useState<PYQ[]>([]);
  const [pyqQuestion, setPyqQuestion] = useState('');
  const [pyqAnswer, setPyqAnswer] = useState('');
  const [editingPyq, setEditingPyq] = useState<PYQ | null>(null);

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
    setOptions([]); // Clear previous options
    setYears([]); // Clear previous years
    setPyqs([]); // Clear previous pyqs

    // Fetch options for the selected exam
    fetch(`/api/exams/${exam.id}/options`)
      .then((res) => res.json())
      .then((data) => setOptions(data));

    // Fetch years for the selected exam
    fetch(`/api/exams/${exam.id}/years`)
      .then((res) => res.json())
      .then((data) => setYears(data));
  };

  const handleDelete = async (id: number) => {
    console.log('Deleting exam:', id);
    await fetch(`/api/exams/${id}`, {
      method: 'DELETE',
    });
    setExams(exams.filter((exam) => exam.id !== id));
  };

  const handleOptionDelete = async (id: number) => {
    await fetch(`/api/options/${id}`, {
      method: 'DELETE',
    });
    setOptions(options.filter((option) => option.id !== id));
  };

  const handleOptionEdit = (option: ExamOption) => {
    setEditingOption(option);
    setOptionName(option.name);
    setOptionDescription(option.description);
    setOptionHref(option.href);
  };

  const handleOptionSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const optionData = { name: optionName, description: optionDescription, href: optionHref };

    if (editingOption) {
      // Update existing option
      const response = await fetch(`/api/options/${editingOption.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(optionData),
      });
      const updatedOption = await response.json();
      setOptions(options.map((option) => (option.id === updatedOption.id ? updatedOption : option)));
      setEditingOption(null);
    } else {
      // Create new option
      const response = await fetch(`/api/exams/${editingExam!.id}/options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(optionData),
      });
      const newOption = await response.json();
      setOptions([...options, newOption]);
    }

    // Reset form
    setOptionName('');
    setOptionDescription('');
    setOptionHref('');
  };

  const handleYearDelete = async (id: number) => {
    await fetch(`/api/years/${id}`, {
      method: 'DELETE',
    });
    setYears(years.filter((year) => year.id !== id));
  };

  const handleYearEdit = (year: ExamYear) => {
    setEditingYear(year);
    setYearValue(year.year);
    setPyqs([]); // Clear previous pyqs

    // Fetch pyqs for the selected year
    fetch(`/api/exams/${editingExam!.id}/years/${year.id}/pyqs`)
      .then((res) => res.json())
      .then((data) => setPyqs(data));
  };

  const handleYearSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const yearData = { year: yearValue };

    if (editingYear) {
      // Update existing year
      const response = await fetch(`/api/years/${editingYear.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(yearData),
      });
      const updatedYear = await response.json();
      setYears(years.map((year) => (year.id === updatedYear.id ? updatedYear : year)));
      setEditingYear(null);
    } else {
      // Create new year
      const response = await fetch(`/api/exams/${editingExam!.id}/years`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(yearData),
      });
      const newYear = await response.json();
      setYears([...years, newYear]);
    }

    // Reset form
    setYearValue(0);
  };

  const handlePyqDelete = async (id: number) => {
    await fetch(`/api/pyqs/${id}`, {
      method: 'DELETE',
    });
    setPyqs(pyqs.filter((pyq) => pyq.id !== id));
  };

  const handlePyqEdit = (pyq: PYQ) => {
    setEditingPyq(pyq);
    setPyqQuestion(pyq.question);
    setPyqAnswer(pyq.answer);
  };

  const handlePyqSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const pyqData = { question: pyqQuestion, answer: pyqAnswer };

    if (editingPyq) {
      // Update existing PYQ
      const response = await fetch(`/api/pyqs/${editingPyq.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pyqData),
      });
      const updatedPyq = await response.json();
      setPyqs(pyqs.map((pyq) => (pyq.id === updatedPyq.id ? updatedPyq : pyq)));
      setEditingPyq(null);
    } else {
      // Create new PYQ
      const response = await fetch(`/api/exams/${editingExam!.id}/years/${editingYear!.id}/pyqs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pyqData),
      });
      const newPyq = await response.json();
      setPyqs([...pyqs, newPyq]);
    }

    // Reset form
    setPyqQuestion('');
    setPyqAnswer('');
  };

  useEffect(() => {
    fetch('/api/exams')
      .then((res) => res.json())
      .then((data) => setExams(data));
  }, []);

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

              {editingExam && editingExam.id === exam.id && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold mb-4">Exam Options</h4>

                  <form onSubmit={handleOptionSubmit} className="mb-4">
                    <div className="mb-2">
                      <input
                        type="text"
                        placeholder="Option Name"
                        value={optionName}
                        onChange={(e) => setOptionName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        placeholder="Option Description"
                        value={optionDescription}
                        onChange={(e) => setOptionDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        placeholder="Option Href"
                        value={optionHref}
                        onChange={(e) => setOptionHref(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {editingOption ? 'Update Option' : 'Add Option'}
                    </button>
                  </form>

                  <ul>
                    {options.map((option) => (
                      <li key={option.id} className="mb-2 p-2 border rounded flex justify-between items-center">
                        <div>
                          <p className="font-bold">{option.name}</p>
                          <p>{option.description}</p>
                          <p className="text-sm text-gray-500">{option.href}</p>
                        </div>
                        <div>
                          <button
                            onClick={() => handleOptionEdit(option)}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleOptionDelete(option.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {editingExam && editingExam.id === exam.id && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold mb-4">Exam Years</h4>

                  <form onSubmit={handleYearSubmit} className="mb-4">
                    <div className="mb-2">
                      <input
                        type="number"
                        placeholder="Year"
                        value={yearValue}
                        onChange={(e) => setYearValue(parseInt(e.target.value, 10))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {editingYear ? 'Update Year' : 'Add Year'}
                    </button>
                  </form>

                  <ul>
                    {years.map((year) => (
                      <li key={year.id} className="mb-2 p-2 border rounded flex justify-between items-center">
                        <div>
                          <p className="font-bold">{year.year}</p>
                        </div>
                        <div>
                          <button
                            onClick={() => handleYearEdit(year)}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleYearDelete(year.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {editingYear && editingYear.id === editingYear.id && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold mb-4">PYQs for {editingYear.year}</h4>

                  <form onSubmit={handlePyqSubmit} className="mb-4">
                    <div className="mb-2">
                      <textarea
                        placeholder="Question"
                        value={pyqQuestion}
                        onChange={(e) => setPyqQuestion(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <textarea
                        placeholder="Answer"
                        value={pyqAnswer}
                        onChange={(e) => setPyqAnswer(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {editingPyq ? 'Update PYQ' : 'Add PYQ'}
                    </button>
                  </form>

                  <ul>
                    {pyqs.map((pyq) => (
                      <li key={pyq.id} className="mb-2 p-2 border rounded shadow-sm">
                        <p className="font-bold">Q: {pyq.question}</p>
                        <p>A: {pyq.answer}</p>
                        <div className="mt-2">
                          <button
                            onClick={() => handlePyqEdit(pyq)}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handlePyqDelete(pyq.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
