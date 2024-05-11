import { generateEmbedding } from "./generateEmbeddings.js";
import { supabase } from "./supabase.js";

const getAdvertise = () => {
    return supabase.from('advertise').select('*').is('embedding', null);
}

const addAdEmbedding = async (advertise) => {
    console.log('Generating embedding for advertisement:', advertise.advertise_name);
    const embedding = await generateEmbedding(advertise.advertise_name);
    await supabase.from('advertise').update({ embedding }).eq('advertise_id', advertise.advertise_id);
}

const processNewAdvertise = async (payload) => {
    const newAdvertise = payload.new;
    console.log('New advertisement inserted:', newAdvertise);
    await addAdEmbedding(newAdvertise);
};

const startRealtimeSubscription = () => {
    const changes = supabase
        .channel('schema-db-changes')
        .on(
            'postgres_changes',
            {
                event: 'INSERT', // Listen only to INSERTs
                schema: 'public',
                table: 'advertise',
            },
            (payload) => {
                processNewAdvertise(payload);
            }
        )
        .subscribe();
    console.log('Real-time subscription started.');
}

// Process advertisements initially
// const processAllAds = async () => {
//     const { data: advertise } = await getAdvertise();
//     console.log('Initial advertisements:', advertise);
//     if (!advertise?.length) {
//         return;
//     }
//     await Promise.all(advertise.map(addAdEmbedding));
// }

// Start real-time subscription
startRealtimeSubscription();

// Process advertisements initially
// processAllAds();
