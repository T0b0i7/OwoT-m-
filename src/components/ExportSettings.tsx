import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, FileText, Sheet, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/store/useStore';

export const ExportSettings = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const transactions = useStore((state) => state.transactions);
  const budgets = useStore((state) => state.budgets);
  const tontines = useStore((state) => state.tontines);

  const [selectedData, setSelectedData] = useState({
    transactions: true,
    budgets: true,
    tontines: true,
  });

  const [exportFormat, setExportFormat] = useState('csv');

  const exportToCSV = () => {
    try {
      let csvContent = 'data:text/csv;charset=utf-8,';
      let headers = [];
      let rows = [];

      if (selectedData.transactions && transactions.length > 0) {
        headers = ['Type', 'Catégorie', 'Montant', 'Description', 'Date'];
        rows = transactions.map(t => [
          t.type,
          t.category,
          t.amount,
          t.description,
          t.date,
        ]);

        csvContent += 'TRANSACTIONS\n' + headers.join(',') + '\n';
        rows.forEach(row => {
          csvContent += row.join(',') + '\n';
        });
        csvContent += '\n';
      }

      if (selectedData.budgets && budgets.length > 0) {
        headers = ['Catégorie', 'Limite', 'Mois'];
        rows = budgets.map(b => [b.category, b.limit, b.month]);

        csvContent += 'BUDGETS\n' + headers.join(',') + '\n';
        rows.forEach(row => {
          csvContent += row.join(',') + '\n';
        });
        csvContent += '\n';
      }

      if (selectedData.tontines && tontines.length > 0) {
        headers = ['Nom', 'Montant', 'Fréquence', 'Membres'];
        rows = tontines.map(t => [
          t.name,
          t.contributionAmount,
          t.frequency,
          t.members.length,
        ]);

        csvContent += 'TONTINES\n' + headers.join(',') + '\n';
        rows.forEach(row => {
          csvContent += row.join(',') + '\n';
        });
      }

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `owotoomomo_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.click();

      toast({
        title: 'Export réussi',
        description: `Fichier CSV téléchargé avec succès`,
      });
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur s\'est produite lors de l\'export',
        variant: 'destructive',
      });
    }
  };

  const exportToJSON = () => {
    try {
      const data = {
        exportDate: new Date().toISOString(),
        appName: 'OwoTọ́ọ̀mọ̀',
        ...(selectedData.transactions && { transactions }),
        ...(selectedData.budgets && { budgets }),
        ...(selectedData.tontines && { tontines }),
      };

      const jsonString = JSON.stringify(data, null, 2);
      const link = document.createElement('a');
      link.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonString));
      link.setAttribute('download', `owotoomomo_export_${new Date().toISOString().split('T')[0]}.json`);
      link.click();

      toast({
        title: 'Export réussi',
        description: `Fichier JSON téléchargé avec succès`,
      });
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur s\'est produite lors de l\'export',
        variant: 'destructive',
      });
    }
  };

  const handleExport = () => {
    if (!selectedData.transactions && !selectedData.budgets && !selectedData.tontines) {
      toast({
        title: 'Erreur',
        description: 'Veuillez sélectionner au moins une catégorie de données',
        variant: 'destructive',
      });
      return;
    }

    if (exportFormat === 'csv') {
      exportToCSV();
    } else {
      exportToJSON();
    }
  };

  const totalSize = (
    (selectedData.transactions ? transactions.length : 0) +
    (selectedData.budgets ? budgets.length : 0) +
    (selectedData.tontines ? tontines.length : 0)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Exportation des données
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Sélection des données */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-gray-700">Sélectionner les données à exporter</h3>
          
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={selectedData.transactions}
              onChange={(e) => setSelectedData({ ...selectedData, transactions: e.target.checked })}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium text-sm">Transactions</p>
              <p className="text-xs text-gray-600">{transactions.length} enregistrements</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={selectedData.budgets}
              onChange={(e) => setSelectedData({ ...selectedData, budgets: e.target.checked })}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium text-sm">Budgets</p>
              <p className="text-xs text-gray-600">{budgets.length} enregistrements</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={selectedData.tontines}
              onChange={(e) => setSelectedData({ ...selectedData, tontines: e.target.checked })}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium text-sm">Tontines</p>
              <p className="text-xs text-gray-600">{tontines.length} enregistrements</p>
            </div>
          </label>
        </div>

        {/* Sélection du format */}
        <div className="space-y-3 pt-4 border-t">
          <h3 className="font-semibold text-sm text-gray-700">Format d'export</h3>
          
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer" style={{ borderColor: exportFormat === 'csv' ? '#3b82f6' : '#e5e7eb', backgroundColor: exportFormat === 'csv' ? '#eff6ff' : '#f9fafb' }}>
            <input
              type="radio"
              name="format"
              value="csv"
              checked={exportFormat === 'csv'}
              onChange={(e) => setExportFormat(e.target.value)}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium text-sm flex items-center gap-2">
                <Sheet className="h-4 w-4" />
                CSV (Tableur)
              </p>
              <p className="text-xs text-gray-600">Compatible avec Excel, Sheets</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer" style={{ borderColor: exportFormat === 'json' ? '#3b82f6' : '#e5e7eb', backgroundColor: exportFormat === 'json' ? '#eff6ff' : '#f9fafb' }}>
            <input
              type="radio"
              name="format"
              value="json"
              checked={exportFormat === 'json'}
              onChange={(e) => setExportFormat(e.target.value)}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                JSON (Données structurées)
              </p>
              <p className="text-xs text-gray-600">Format standard pour la sauvegarde</p>
            </div>
          </label>
        </div>

        {/* Informations */}
        <div className="p-3 bg-blue-50 rounded-lg flex gap-2 text-xs text-gray-600">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <p>
            {totalSize > 0 
              ? `Export contenant ${totalSize} enregistrements`
              : 'Aucune donnée à exporter'}
          </p>
        </div>

        {/* Boutons d'action */}
        <Button 
          onClick={handleExport} 
          className="w-full"
          disabled={totalSize === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Télécharger l'export {exportFormat.toUpperCase()}
        </Button>

        {/* Section sauvegarde automatique */}
        <div className="pt-4 border-t space-y-3">
          <h3 className="font-semibold text-sm text-gray-700">Sauvegarde automatique</h3>
          <p className="text-sm text-gray-600">
            Vos données sont automatiquement sauvegardées localement sur votre appareil.
          </p>
          <Button variant="outline" className="w-full">
            Activer la synchronisation cloud
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
