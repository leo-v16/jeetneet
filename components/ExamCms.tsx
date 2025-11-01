import { useState, FormEvent, useEffect } from "react";

type Exam = {
  id: number;
  name: string;
  description: string;
  popularity: number;
}

type ExamOption = {
  id: number;
  name: string;
  description: string;
  href: string;
};

type ExamYear = {
  id: number;
  year: number;
  pdfFilePath?: string | null;
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

  // Options
  const [options, setOptions] = useState<ExamOption[]>([]);
  const [optionName, setOptionName] = useState('');
  const [optionDescription, setOptionDescription] = useState('');
  const [optionHref, setOptionHref] = useState('');
  const [editingOption, setEditingOption] = useState<ExamOption | null>(null);

  // Years
  const [years, setYears] = useState<ExamYear[]>([]);
  const [yearValue, setYearValue] = useState(0);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [editingYear, setEditingYear] = useState<ExamYear | null>(null);

  // --- Exam CRUD ---
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const examData = { name, description, popularity };

    if (editingExam) {
      const response = await fetch(`/api/exams/${editingExam.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData),
      });
      const updatedExam = await response.json();
      setExams(exams.map(e => (e.id === updatedExam.id ? updatedExam : e)));
      setEditingExam(null);
    } else {
      const response = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData),
      });
      const newExam = await response.json();
      setExams([...exams, newExam]);
    }

    setName('');
    setDescription('');
    setPopularity(0);
  };

  const handleEdit = (exam: Exam) => {
    setEditingExam(exam);
    setName(exam.name);
    setDescription(exam.description);
    setPopularity(exam.popularity);

    // Fetch nested data
    fetch(`/api/exams/${exam.id}/options`).then(res => res.json()).then(setOptions);
    fetch(`/api/exams/${exam.id}/years`).then(res => res.json()).then(setYears);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/exams/${id}`, { method: 'DELETE' });
    setExams(exams.filter(e => e.id !== id));
  };

  // --- Option CRUD ---
  const handleOptionSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { name: optionName, description: optionDescription, href: optionHref };

    if (editingOption) {
      const res = await fetch(`/api/options/${editingOption.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      setOptions(options.map(o => (o.id === updated.id ? updated : o)));
      setEditingOption(null);
    } else {
      const res = await fetch(`/api/exams/${editingExam!.id}/options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const newOption = await res.json();
      setOptions([...options, newOption]);
    }

    setOptionName('');
    setOptionDescription('');
    setOptionHref('');
  };

  const handleOptionEdit = (o: ExamOption) => {
    setEditingOption(o);
    setOptionName(o.name);
    setOptionDescription(o.description);
    setOptionHref(o.href);
  };

  const handleOptionDelete = async (id: number) => {
    await fetch(`/api/options/${id}`, { method: 'DELETE' });
    setOptions(options.filter(o => o.id !== id));
  };

  // --- Year CRUD ---
  const handleYearSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (editingYear) {
      // Update existing year
      if (pdfFile) {
        // Upload new PDF for existing year
        const formData = new FormData();
        formData.append('pdfFile', pdfFile);
        const res = await fetch(`/api/exams/${editingExam!.id}/years/${editingYear.id}/upload-pdf`, {
          method: 'POST',
          body: formData,
        });
        const updatedYear = await res.json();
        setYears(years.map(y => (y.id === updatedYear.id ? updatedYear : y)));
      } else {
        // Update other year properties (e.g., yearValue)
        const data = { year: yearValue };
        const res = await fetch(`/api/years/${editingYear.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const updatedYear = await res.json();
        setYears(years.map(y => (y.id === updatedYear.id ? updatedYear : y)));
      }
      setEditingYear(null);
    } else {
      // Create new year
      const data = { year: yearValue };
      const res = await fetch(`/api/exams/${editingExam!.id}/years`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const newYear = await res.json();
      setYears([...years, newYear]);

      if (pdfFile) {
        // Upload PDF for newly created year
        const formData = new FormData();
        formData.append('pdfFile', pdfFile);
        const uploadRes = await fetch(`/api/exams/${editingExam!.id}/years/${newYear.id}/upload-pdf`, {
          method: 'POST',
          body: formData,
        });
        const updatedYearWithPdf = await uploadRes.json();
        setYears(years.map(y => (y.id === updatedYearWithPdf.id ? updatedYearWithPdf : y)));
      }
    }

    setYearValue(0);
    setPdfFile(null);
  };

  const handleYearEdit = (y: ExamYear) => {
    setEditingYear(y);
    setYearValue(y.year);
    setPdfFile(null); // Clear file input when editing
  };

  const handleYearDelete = async (id: number) => {
    await fetch(`/api/years/${id}`, { method: 'DELETE' });
    setYears(years.filter(y => y.id !== id));
  };

  // --- Fetch Exams on Load ---
  useEffect(() => {
    fetch('/api/exams').then(res => res.json()).then(setExams);
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Exam Management</h1>

      {/* Exam Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <input type="text" placeholder="Exam Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full mb-2" required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 w-full mb-2" required />
        <input type="number" placeholder="Popularity" value={popularity} onChange={e => setPopularity(parseInt(e.target.value, 10))} className="border p-2 w-full mb-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingExam ? 'Update Exam' : 'Add Exam'}</button>
      </form>

      {/* Exam List */}
      <ul>
        {exams.map(exam => (
          <li key={exam.id} className="border p-4 mb-4 rounded">
            <h3 className="font-bold text-lg">{exam.name}</h3>
            <p>{exam.description}</p>
            <p>Popularity: {exam.popularity}</p>
            <div className="mt-2">
              <button onClick={() => handleEdit(exam)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(exam.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>

            {editingExam && editingExam.id === exam.id && (
              <>
                {/* Options Section */}
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-bold mb-2">Options</h4>
                  <form onSubmit={handleOptionSubmit}>
                    <input type="text" placeholder="Option Name" value={optionName} onChange={e => setOptionName(e.target.value)} className="border p-2 w-full mb-2" />
                    <input type="text" placeholder="Option Description" value={optionDescription} onChange={e => setOptionDescription(e.target.value)} className="border p-2 w-full mb-2" />
                    <input type="text" placeholder="Option Href" value={optionHref} onChange={e => setOptionHref(e.target.value)} className="border p-2 w-full mb-2" />
                    <button className="bg-green-500 text-white px-4 py-1 rounded">{editingOption ? 'Update Option' : 'Add Option'}</button>
                  </form>
                  <ul>
                    {options.map(o => (
                      <li key={o.id} className="mt-2 border p-2 rounded">
                        <p>{o.name}</p>
                        <p>{o.description}</p>
                        <p className="text-sm text-gray-500">{o.href}</p>
                        <button onClick={() => handleOptionEdit(o)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                        <button onClick={() => handleOptionDelete(o.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Years Section */}
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-bold mb-2">Years</h4>
                  <form onSubmit={handleYearSubmit}>
                    <input type="number" placeholder="Year" value={yearValue} onChange={e => setYearValue(parseInt(e.target.value, 10))} className="border p-2 w-full mb-2" />
                    <input type="file" accept=".pdf" onChange={e => setPdfFile(e.target.files ? e.target.files[0] : null)} className="border p-2 w-full mb-2" />
                    <button className="bg-green-500 text-white px-4 py-1 rounded">{editingYear ? 'Update Year' : 'Add Year'}</button>
                  </form>
                  <ul>
                    {years.map(y => (
                      <li key={y.id} className="mt-2 border p-2 rounded">
                        <p>{y.year}</p>
                        {y.pdfFilePath && <a href={y.pdfFilePath} target="_blank" className="text-blue-500">View PDF</a>}
                        <button onClick={() => handleYearEdit(y)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                        <button onClick={() => handleYearDelete(y.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
