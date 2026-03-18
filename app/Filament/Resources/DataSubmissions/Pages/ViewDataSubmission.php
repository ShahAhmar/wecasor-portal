<?php

namespace App\Filament\Resources\DataSubmissions\Pages;

use App\Filament\Resources\DataSubmissions\DataSubmissionResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewDataSubmission extends ViewRecord
{
    protected static string $resource = DataSubmissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
