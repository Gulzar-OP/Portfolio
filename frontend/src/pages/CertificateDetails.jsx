import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaIdCard,
  FaTimes,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
const API = import.meta.env.VITE_API || "http://localhost:2000"
export default function CertificateDetails() {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openImage, setOpenImage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/v1/certificate/${id}`);
        const data = res?.data?.certification || res?.data?.certificate || null;
        setCertificate(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load certificate details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString("en-IN") : "N/A";

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!certificate) return <div className="p-6 text-center">Certificate not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg"
      >
        <div className="border-b bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white">
          <p className="mb-2 text-sm text-slate-300">Certificate ID: {id}</p>
          <h1 className="text-3xl font-bold">{certificate.title}</h1>
          <p className="mt-2 text-slate-200">{certificate.description}</p>
        </div>

        <div className="grid gap-8 p-6 md:grid-cols-[220px_1fr]">
          <div className="flex flex-col items-center rounded-xl bg-slate-100 p-5 text-center">
            <div
              onClick={() => certificate.image && setOpenImage(true)}
              className={`mb-4 w-full ${certificate.image ? "cursor-zoom-in" : ""}`}
            >
              {certificate.image ? (
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="h-40 w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-40 w-full items-center justify-center rounded-lg bg-slate-200 text-slate-500">
                  No Image
                </div>
              )}
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              <FaCheckCircle />
              Verified
            </span>

            {certificate.featured && (
              <span className="mt-3 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                Featured
              </span>
            )}
          </div>

          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard icon={<FaBuilding />} label="Issuer" value={certificate.issuer} />
              <InfoCard icon={<FaCalendarAlt />} label="Issue Date" value={formatDate(certificate.issueDate)} />
              <InfoCard icon={<FaIdCard />} label="Credential ID" value={certificate.credentialID} />
              <InfoCard
                icon={<FaCalendarAlt />}
                label="Expiry"
                value={certificate.doesNotExpire ? "Does not expire" : formatDate(certificate.expiryDate)}
              />
            </div>

            <div className="mt-6">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {certificate.skills?.map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Details</h2>
              <p className="leading-7 text-slate-600">{certificate.description}</p>
            </div>

            {certificate.credentialURL && (
              <div className="mt-8">
                <a
                  href={certificate.credentialURL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800"
                >
                  View Credential <FaExternalLinkAlt />
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {openImage && certificate.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setOpenImage(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[95vh] max-w-[95vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenImage(false)}
                className="absolute -right-3 -top-3 z-10 rounded-full bg-white p-3 text-slate-900 shadow-lg"
              >
                <FaTimes />
              </button>

              <img
                src={certificate.image}
                alt={certificate.title}
                className="max-h-[95vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
        <span className="text-slate-700">{icon}</span>
        {label}
      </div>
      <div className="text-base font-medium text-slate-900">{value || "N/A"}</div>
    </div>
  );
}