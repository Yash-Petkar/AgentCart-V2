import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User as UserIcon,
  CheckCircle2,
  ShoppingCart,
  ArrowRight,
  RefreshCw,
  Terminal,
  ExternalLink,
  Mic,
  MicOff,
  Camera,
  Layers,
  Truck,
  HelpCircle,
  Check,
  Package,
} from 'lucide-react';
import { AIMessage, Product } from '../types';
import { api } from '../lib/api';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onViewProduct: (productId: string) => void;
  onGoToCart: () => void;
  onGoToOrders?: () => void;
  onCartUpdated?: () => void;
  initialPrompt?: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onViewProduct,
  onGoToCart,
  onGoToOrders,
  onCartUpdated,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm your AgentCart AI shopping assistant. I can search our catalog, compare models, find products within your budget, build multi-item bundles, track orders, and even search by image. What can I help you with?",
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addingBundle, setAddingBundle] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);

  // Feature 1: Voice-to-Text State
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Feature 5: Visual Product Search State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Feature 6: 3-Question "Find My Match" Guided Quiz State
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState<1 | 2 | 3>(1);
  const [quizAnswers, setQuizAnswers] = useState<{
    useCase?: string;
    budget?: string;
    priority?: string;
  }>({});

  const suggestions = [
    '🎙️ Voice Search',
    '🎯 Find My Match Quiz',
    '⚖️ Compare Lenovo LOQ and Acer Nitro V',
    '📦 Build gaming setup bundle under ₹80,000',
    '🚚 Where is my order?',
    'Find best laptop under 70000 and add to cart',
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, quizActive]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendPrompt(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // ==========================================
  // Feature 1: Voice-to-Text Shopping Logic
  // ==========================================
  const toggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError('Speech recognition is not supported in this browser. Please type your query.');
      setTimeout(() => setSpeechError(null), 4000);
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputPrompt(transcript);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission denied. Please allow microphone access in browser settings.');
        } else if (event.error === 'no-speech') {
          setSpeechError('No speech detected. Please try again.');
        } else {
          setSpeechError(`Voice input issue: ${event.error}`);
        }
        setTimeout(() => setSpeechError(null), 4000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      setIsListening(false);
      setSpeechError('Could not start voice recognition.');
      setTimeout(() => setSpeechError(null), 4000);
    }
  };

  // ==========================================
  // Feature 5: Visual Product Search Logic
  // ==========================================
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // ==========================================
  // Feature 3: 1-Click Multi-Add Bundle
  // ==========================================
  const handleAddBundleToCart = async (bundleProducts: Product[]) => {
    if (addingBundle || bundleProducts.length === 0) return;
    setAddingBundle(true);
    try {
      for (const item of bundleProducts) {
        await api.addToCart(item.id, 1);
      }
      onCartUpdated?.();
      setBundleAdded(true);
      setTimeout(() => setBundleAdded(false), 3500);
    } catch (err: any) {
      alert(`Could not add bundle to cart: ${err.message || 'Please try again.'}`);
    } finally {
      setAddingBundle(false);
    }
  };

  // ==========================================
  // Send Prompt Dispatcher
  // ==========================================
  const handleSendPrompt = async (text: string, imageToSend?: string | null) => {
    const query = text.trim();
    const img = imageToSend !== undefined ? imageToSend : selectedImage;

    if ((!query && !img) || isLoading) return;

    // Stop voice if still listening
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const displayText = query || (img ? 'Visual product matching for uploaded image' : '');
    const userMsg: AIMessage = {
      role: 'user',
      content: displayText,
      image: img || undefined,
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await api.sendAIMessage(displayText, messages, img || undefined);
      setMessages(prev => [...prev, response]);

      if (
        response.actionTaken?.type === 'ADD_TO_CART' ||
        (response.content && response.content.toLowerCase().includes('added to your cart'))
      ) {
        onCartUpdated?.();
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `I ran into an issue processing your request: ${err.message || 'Please try again.'}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // Feature 6: 3-Question Guided Quiz Flow
  // ==========================================
  const startQuiz = () => {
    setQuizActive(true);
    setQuizStep(1);
    setQuizAnswers({});
  };

  const handleQuizAnswer = (key: 'useCase' | 'budget' | 'priority', value: string) => {
    const updated = { ...quizAnswers, [key]: value };
    setQuizAnswers(updated);

    if (quizStep === 1) {
      setQuizStep(2);
    } else if (quizStep === 2) {
      setQuizStep(3);
    } else if (quizStep === 3) {
      setQuizActive(false);
      const prompt = `Help me find my match: Primary use case is ${updated.useCase}, budget is ${updated.budget}, and priority spec is ${value}.`;
      handleSendPrompt(prompt);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-zinc-900/30 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        id="ai-assistant-drawer"
        className="w-full max-w-lg bg-white text-zinc-900 h-full flex flex-col shadow-2xl border-l border-zinc-200"
      >
        {/* Header */}
        <div className="p-4 bg-white border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-zinc-900 flex items-center justify-center text-white shadow-2xs">
              <Sparkles className="w-4 h-4 text-zinc-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-zinc-900">AgentCart AI Assistant</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Multimodal Active
                </span>
              </div>
              <p className="text-xs text-zinc-500">Voice, Specs Matrix, Bundles, Tracking & Image Search</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={startQuiz}
              className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors text-xs font-medium flex items-center gap-1 border border-zinc-200"
              title="Take 30s Guided Match Quiz"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Quiz</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature 6: Guided Quiz Overlay Card */}
        {quizActive && (
          <div className="p-4 bg-indigo-50/70 border-b border-indigo-100 animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-950">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>3-Question "Find My Match" Quiz (Step {quizStep} of 3)</span>
              </div>
              <button
                onClick={() => setQuizActive(false)}
                className="text-zinc-400 hover:text-zinc-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {quizStep === 1 && (
              <div>
                <p className="text-xs text-indigo-900 font-medium mb-2.5">
                  1. What is your primary use case?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Gaming & High Performance',
                    'Coding & Professional Work',
                    'Everyday & Student Life',
                    'Audio & Entertainment',
                  ].map(option => (
                    <button
                      key={option}
                      onClick={() => handleQuizAnswer('useCase', option)}
                      className="p-2 text-xs font-medium text-left rounded-md bg-white border border-indigo-200 hover:border-indigo-600 hover:bg-indigo-50 text-zinc-800 transition-colors shadow-2xs"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 2 && (
              <div>
                <p className="text-xs text-indigo-900 font-medium mb-2.5">
                  2. What is your preferred budget range?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Under ₹40,000',
                    '₹40,000 - ₹75,000',
                    '₹75,000 - ₹1,20,000',
                    'Flexible / No Limit',
                  ].map(option => (
                    <button
                      key={option}
                      onClick={() => handleQuizAnswer('budget', option)}
                      className="p-2 text-xs font-medium text-left rounded-md bg-white border border-indigo-200 hover:border-indigo-600 hover:bg-indigo-50 text-zinc-800 transition-colors shadow-2xs"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 3 && (
              <div>
                <p className="text-xs text-indigo-900 font-medium mb-2.5">
                  3. What specification matters most to you?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Peak Performance & Speed',
                    'All-Day Battery Life',
                    'Ultra-Light Portability',
                    'Best Value for Money',
                  ].map(option => (
                    <button
                      key={option}
                      onClick={() => handleQuizAnswer('priority', option)}
                      className="p-2 text-xs font-medium text-left rounded-md bg-white border border-indigo-200 hover:border-indigo-600 hover:bg-indigo-50 text-zinc-800 transition-colors shadow-2xs"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-zinc-50/50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role !== 'user' && (
                <div className="w-7 h-7 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[90%] rounded-lg p-3.5 ${
                  msg.role === 'user'
                    ? 'bg-zinc-900 text-white shadow-2xs'
                    : 'bg-white text-zinc-800 border border-zinc-200 shadow-2xs'
                }`}
              >
                {/* User Uploaded Image Preview */}
                {msg.image && (
                  <div className="mb-2.5">
                    <img
                      src={msg.image}
                      alt="Uploaded query"
                      className="w-36 h-36 object-cover rounded-md border border-zinc-700/40 bg-zinc-800"
                    />
                    <span className="inline-block mt-1 text-[10px] text-zinc-300">
                      Visual Product Query
                    </span>
                  </div>
                )}

                {/* Content text */}
                <div className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm font-normal">
                  {msg.content}
                </div>

                {/* Feature 2: Automated Spec & Price Comparison Matrix Card */}
                {msg.comparison && msg.comparison.products.length >= 2 && (
                  <div className="mt-3 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 mb-2">
                      <Layers className="w-4 h-4 text-zinc-700" />
                      <span>Spec & Price Comparison Matrix</span>
                    </div>

                    {/* Side by side product header */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {msg.comparison.products.map(prod => (
                        <div
                          key={prod.id}
                          className="bg-white p-2 rounded-md border border-zinc-200 text-center flex flex-col justify-between"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-16 h-16 mx-auto object-contain p-1"
                          />
                          <div className="text-xs font-semibold text-zinc-900 truncate mt-1">
                            {prod.name}
                          </div>
                          <div className="text-xs font-bold text-zinc-900 mt-0.5">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </div>
                          <button
                            onClick={() => onAddToCart(prod)}
                            className="mt-2 w-full py-1 px-2 rounded bg-zinc-900 hover:bg-black text-white text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Comparison Attribute Table */}
                    <div className="border border-zinc-200 rounded-md overflow-hidden bg-white text-[11px]">
                      {msg.comparison.matrix.map((row, rIdx) => (
                        <div
                          key={rIdx}
                          className={`grid grid-cols-3 p-2 items-center ${
                            rIdx % 2 === 0 ? 'bg-zinc-50/50' : 'bg-white'
                          } border-b border-zinc-100 last:border-b-0`}
                        >
                          <span className="font-semibold text-zinc-600 col-span-1">
                            {row.attribute}
                          </span>
                          {msg.comparison!.products.map(prod => (
                            <span
                              key={prod.id}
                              className="col-span-1 text-center text-zinc-800 font-medium px-1 truncate"
                            >
                              {row.values[prod.id] || 'N/A'}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feature 3: AI "Budget Bundle Builder" Card */}
                {msg.bundle && (
                  <div className="mt-3 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900">
                        <Package className="w-4 h-4 text-zinc-700" />
                        <span>{msg.bundle.title}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Save ₹{msg.bundle.savings.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Budget allocation info */}
                    <div className="mb-2 text-[11px] text-zinc-600 flex justify-between">
                      <span>
                        Total: <strong>₹{msg.bundle.totalAmount.toLocaleString('en-IN')}</strong>
                      </span>
                      <span>
                        Budget Ceiling: ₹{msg.bundle.budget.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Bundle items list */}
                    <div className="space-y-1.5 mb-3">
                      {msg.bundle.items.map(item => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-white p-2 rounded-md border border-zinc-200 text-xs"
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-8 h-8 rounded object-contain bg-zinc-50 border border-zinc-100 shrink-0"
                            />
                            <span className="font-medium text-zinc-900 truncate">
                              {item.name}
                            </span>
                          </div>
                          <span className="font-semibold text-zinc-900 shrink-0">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* 1-Click Multi-Add Button */}
                    <button
                      onClick={() => handleAddBundleToCart(msg.bundle!.items)}
                      disabled={addingBundle || bundleAdded}
                      className={`w-full py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        bundleAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-900 hover:bg-black text-white'
                      }`}
                    >
                      {bundleAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Bundle Added to Cart!</span>
                        </>
                      ) : addingBundle ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Adding all items...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add Entire Bundle to Cart (1-Click)</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Feature 4: AI Order Status & Tracking Agent Card */}
                {msg.orderTracking && (
                  <div className="mt-3 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900">
                        <Truck className="w-4 h-4 text-zinc-700" />
                        <span>Order #{msg.orderTracking.orderNumber}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-900 text-white">
                        {msg.orderTracking.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-600 space-y-1 mb-3">
                      <div>
                        Carrier: <strong>{msg.orderTracking.carrier}</strong>
                      </div>
                      <div>
                        Tracking No:{' '}
                        <code className="bg-zinc-200/70 px-1 py-0.5 rounded text-[10px]">
                          {msg.orderTracking.trackingNumber}
                        </code>
                      </div>
                      <div>
                        Estimated Delivery: <strong>{msg.orderTracking.estimatedDelivery}</strong>
                      </div>
                    </div>

                    {/* Mini Tracking Milestones */}
                    <div className="grid grid-cols-4 gap-1 text-[10px] text-center mb-3">
                      {msg.orderTracking.timeline.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-1.5 rounded border ${
                            step.current
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-semibold'
                              : step.completed
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-white border-zinc-200 text-zinc-400'
                          }`}
                        >
                          <div className="truncate">{step.label.split(' ')[0]}</div>
                          <div className="text-[9px] mt-0.5">
                            {step.completed ? '✓ Done' : step.current ? '● Active' : '○ Pending'}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        if (onGoToOrders) {
                          onGoToOrders();
                        } else {
                          window.location.href = '/orders';
                        }
                      }}
                      className="w-full py-1.5 px-2.5 rounded bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>View Full Order & Milestones</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Feature 6: Quiz Match Result Card */}
                {msg.quizRecommendation && (
                  <div className="mt-3 p-3 rounded-lg bg-indigo-50/60 border border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-600 text-white">
                        {msg.quizRecommendation.matchScore}% Match Score
                      </span>
                      <span className="text-[10px] text-indigo-900 font-medium">
                        {msg.quizRecommendation.criteriaSummary}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 bg-white p-2.5 rounded-md border border-indigo-100 mb-2">
                      <img
                        src={msg.quizRecommendation.product.images[0]}
                        alt={msg.quizRecommendation.product.name}
                        className="w-12 h-12 object-contain shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-zinc-900 truncate">
                          {msg.quizRecommendation.product.name}
                        </div>
                        <div className="text-xs font-bold text-zinc-900 mt-0.5">
                          ₹{msg.quizRecommendation.product.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <button
                        onClick={() => onAddToCart(msg.quizRecommendation!.product)}
                        className="p-2 rounded bg-zinc-900 hover:bg-black text-white text-xs shrink-0"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1 text-[11px] text-indigo-950 font-normal">
                      {msg.quizRecommendation.matchReasons.map((r, rIdx) => (
                        <div key={rIdx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-indigo-600 shrink-0" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Autonomous Action Confirmation Banner */}
                {msg.actionTaken && (
                  <div className="mt-3 p-2.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1 text-xs">
                      <span className="font-semibold text-emerald-950">
                        {msg.actionTaken.message}
                      </span>
                      <div className="mt-1.5">
                        <button
                          onClick={() => {
                            onClose();
                            onGoToCart();
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 underline"
                        >
                          <span>View in Shopping Cart</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommended Catalog Product Cards */}
                {msg.products &&
                  msg.products.length > 0 &&
                  !msg.comparison &&
                  !msg.bundle &&
                  !msg.quizRecommendation && (
                    <div className="mt-3 space-y-2">
                      <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                        Catalog Matches:
                      </div>
                      {msg.products.slice(0, 3).map(prod => (
                        <div
                          key={prod.id}
                          className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200 flex items-center gap-3 hover:border-zinc-300 transition-colors"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-12 h-12 rounded object-contain bg-white border border-zinc-200 p-1 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-xs text-zinc-900 truncate">
                              {prod.name}
                            </div>
                            <div className="text-[11px] text-zinc-500 mt-0.5">
                              ★ {prod.rating} • ₹{prod.price.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 shrink-0">
                            <button
                              onClick={() => {
                                onAddToCart(prod);
                              }}
                              className="p-1.5 rounded bg-zinc-900 hover:bg-black text-white text-xs transition-colors"
                              title="Add to Cart"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                onClose();
                                onViewProduct(prod.id);
                              }}
                              className="p-1.5 rounded bg-white hover:bg-zinc-100 text-zinc-700 text-xs border border-zinc-200 transition-colors"
                              title="View Product"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Tool Execution Logs */}
                {msg.toolCalls && msg.toolCalls.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-zinc-200 text-[11px] font-mono text-zinc-600">
                    <div className="flex items-center gap-1.5 text-zinc-900 font-semibold mb-1">
                      <Terminal className="w-3 h-3" />
                      <span>Verified Tool Execution:</span>
                    </div>
                    {msg.toolCalls.map((tc, tcIdx) => (
                      <div
                        key={tcIdx}
                        className="bg-zinc-900 text-zinc-200 p-2 rounded border border-zinc-800 my-1"
                      >
                        <span className="text-amber-300 font-semibold">{tc.name}()</span>
                        <div className="text-[10px] text-zinc-400 truncate mt-0.5">
                          params: {JSON.stringify(tc.args)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-md bg-zinc-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center justify-center shrink-0 animate-spin">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div className="bg-white rounded-lg p-3 text-xs text-zinc-600 flex items-center gap-2 border border-zinc-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-zinc-900 animate-ping" />
                <span>Interpreting request & executing catalog tools...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Voice-to-Text Listening Indicator or Speech Error Banner */}
        {isListening && (
          <div className="px-4 py-2 bg-red-50 border-t border-red-200 flex items-center justify-between text-xs text-red-700 animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <span className="font-semibold">Listening hands-free... Speak your shopping request</span>
            </div>
            <button
              onClick={toggleVoiceInput}
              className="text-red-800 hover:text-red-950 underline font-medium text-[11px]"
            >
              Stop
            </button>
          </div>
        )}

        {speechError && (
          <div className="px-4 py-1.5 bg-amber-50 border-t border-amber-200 text-xs text-amber-800 flex items-center justify-between">
            <span>{speechError}</span>
            <button onClick={() => setSpeechError(null)}>
              <X className="w-3.5 h-3.5 text-amber-600" />
            </button>
          </div>
        )}

        {/* Image Attachment Preview Chip */}
        {selectedImage && (
          <div className="px-4 py-2 bg-zinc-100 border-t border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-8 h-8 object-cover rounded border border-zinc-300"
              />
              <div className="text-xs text-zinc-700">
                <span className="font-medium">Image attached</span>
                <span className="text-[10px] text-zinc-500 block">Visual similarity search ready</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="p-1 text-zinc-400 hover:text-zinc-700 rounded"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Suggested Prompts Carousel */}
        <div className="px-4 py-2.5 bg-white border-t border-zinc-200 overflow-x-auto scrollbar-none flex gap-2">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (s.includes('Quiz')) {
                  startQuiz();
                } else if (s.includes('Voice')) {
                  toggleVoiceInput();
                } else {
                  handleSendPrompt(s.replace(/^[^\w\s]+/, '').trim());
                }
              }}
              disabled={isLoading}
              className="text-xs text-zinc-700 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 px-3 py-1 rounded-full whitespace-nowrap border border-zinc-200 transition-colors shrink-0"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Bar with Voice and Image upload buttons */}
        <div className="p-4 bg-white border-t border-zinc-200">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendPrompt(inputPrompt);
            }}
            className="flex items-center gap-2"
          >
            {/* Feature 5: Upload Image Button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-lg border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              title="Visual Product Search (Upload Image)"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Feature 1: Hands-Free Voice Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-2.5 rounded-lg border transition-colors ${
                isListening
                  ? 'bg-red-600 border-red-600 text-white shadow-xs animate-pulse'
                  : 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
              title={isListening ? 'Stop Listening' : 'Voice-to-Text Hands-Free Shopping'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              id="ai-drawer-input"
              type="text"
              value={inputPrompt}
              onChange={e => setInputPrompt(e.target.value)}
              placeholder={
                isListening
                  ? 'Listening to your voice...'
                  : selectedImage
                  ? 'Ask a question about this image...'
                  : 'Type or speak: compare, bundle, track...'
              }
              disabled={isLoading}
              className="flex-1 bg-zinc-50 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 px-3.5 py-2.5 rounded-lg border border-zinc-200 focus:outline-none focus:bg-white focus:border-zinc-900 transition-colors"
            />

            <button
              id="ai-drawer-send-btn"
              type="submit"
              disabled={(!inputPrompt.trim() && !selectedImage) || isLoading}
              className="p-2.5 rounded-lg bg-zinc-900 hover:bg-black text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 text-[10px] text-center text-zinc-400 flex items-center justify-center gap-2">
            <span>Powered by Gemini 3.8 Flash</span>
            <span>•</span>
            <span>Voice & Visual Tool Execution</span>
          </div>
        </div>
      </div>
    </div>
  );
};
